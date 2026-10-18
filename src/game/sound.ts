/**
 * High-Performance Procedural Web Audio Sound Engine for Ball Battle Game
 * Completely self-contained: No external mp3/wav files needed.
 * Zero network latency, instant playback, customizable volume & BGM synth.
 */

export interface SoundSettings {
  muted: boolean;
  sfxVolume: number; // 0 to 1
  bgmVolume: number; // 0 to 1
  bgmEnabled: boolean;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;

  private settings: SoundSettings = {
    muted: false,
    sfxVolume: 0.75,
    bgmVolume: 0.35,
    bgmEnabled: true,
  };

  // Sound cooldowns to avoid audio clipping / ear blasting on rapid events
  private lastWallBounceTime = 0;
  private lastBallBounceTime = 0;
  private lastHitTime = 0;

  // Background music state
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;
  private bgmStep = 0;

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    if (typeof localStorage !== 'undefined') {
      try {
        const savedMuted = localStorage.getItem('game_sound_muted');
        if (savedMuted !== null) this.settings.muted = savedMuted === 'true';

        const savedSfx = localStorage.getItem('game_sound_sfx_volume');
        if (savedSfx !== null) this.settings.sfxVolume = parseFloat(savedSfx);

        const savedBgm = localStorage.getItem('game_sound_bgm_volume');
        if (savedBgm !== null) this.settings.bgmVolume = parseFloat(savedBgm);

        const savedBgmEnabled = localStorage.getItem('game_sound_bgm_enabled');
        if (savedBgmEnabled !== null) this.settings.bgmEnabled = savedBgmEnabled === 'true';
      } catch {}
    }
  }

  public saveSettings() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('game_sound_muted', this.settings.muted.toString());
        localStorage.setItem('game_sound_sfx_volume', this.settings.sfxVolume.toString());
        localStorage.setItem('game_sound_bgm_volume', this.settings.bgmVolume.toString());
        localStorage.setItem('game_sound_bgm_enabled', this.settings.bgmEnabled.toString());
      } catch {}
    }
  }

  public getSettings(): SoundSettings {
    return { ...this.settings };
  }

  /**
   * Lazily initialize AudioContext on user interaction
   */
  public ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.settings.muted ? 0 : 1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX Gain
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.settings.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // BGM Gain
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.settings.bgmVolume, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.settings.muted = muted;
    this.saveSettings();
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 1, this.ctx.currentTime);
    }
    if (muted && this.isBgmPlaying) {
      this.stopBGM();
    } else if (!muted && this.settings.bgmEnabled && !this.isBgmPlaying) {
      this.startBGM();
    }
  }

  public setSFXVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.settings.sfxVolume = clamped;
    this.saveSettings();
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  public setBGMVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.settings.bgmVolume = clamped;
    this.saveSettings();
    if (this.ctx && this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  public setBGMEnabled(enabled: boolean) {
    this.settings.bgmEnabled = enabled;
    this.saveSettings();
    if (enabled && !this.settings.muted) {
      this.startBGM();
    } else {
      this.stopBGM();
    }
  }

  // ==========================================
  // SOUND EFFECTS (SFX) SYNTHESIZER
  // ==========================================

  /**
   * Attack hit impact sound
   */
  public playHit(isCrit = false, heavy = false) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    if (now - this.lastHitTime < 0.04) return; // throttle 40ms
    this.lastHitTime = now;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isCrit ? 'sawtooth' : heavy ? 'triangle' : 'sine';
    const startFreq = isCrit ? 520 : heavy ? 380 : 280;
    const endFreq = isCrit ? 90 : 40;
    const duration = isCrit ? 0.18 : 0.12;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

    gain.gain.setValueAtTime(isCrit ? 0.8 : 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + duration);

    // If critical or heavy, add punchy sub thump
    if (isCrit || heavy) {
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);

      subOsc.start(now);
      subOsc.stop(now + 0.15);
    }
  }

  /**
   * Blade slash / swoosh sound
   */
  public playSlash() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Wall bounce sound (resonant hollow impact)
   */
  public playWallBounce() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    if (now - this.lastWallBounceTime < 0.06) return; // throttle 60ms
    this.lastWallBounceTime = now;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const pitch = 200 + Math.random() * 40;
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.07);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  /**
   * Ball-to-ball collision bounce
   */
  public playBallBounce() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    if (now - this.lastBallBounceTime < 0.05) return; // throttle 50ms
    this.lastBallBounceTime = now;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const pitch = 400 + Math.random() * 80;
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.06);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  /**
   * Laser / Railgun beam sound
   */
  public playLaser() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.22);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * Minigun rapid shot
   */
  public playMinigun() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.05);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Lightning shock / zap
   */
  public playLightning() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Explosion sound
   */
  public playExplosion() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.4);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * Dây Nịt whip snap sound
   */
  public playDayNit() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.09);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  /**
   * Shield activation / barrier hum
   */
  public playShield() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.35);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  /**
   * Skill activation power-up chime
   */
  public playSkillCast(slot = 1) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const baseFreq = 300 + (slot % 6) * 70;

    [0, 0.05, 0.1].forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * (1 + idx * 0.25), now + delay);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * (1.3 + idx * 0.3), now + delay + 0.14);

      gain.gain.setValueAtTime(0.35, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + delay);
      osc.stop(now + delay + 0.14);
    });
  }

  /**
   * The Owner Game 7 Tỉ % & God Mode sound: Majestic cosmic golden chord
   */
  public playGodMode() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const freqs = [261.63, 329.63, 392.0, 523.25, 659.25]; // C major 7 chord

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.35, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.04);
      osc.stop(now + 0.7);
    });
  }

  /**
   * Ultimate supreme skill sound (Nhất Điếu Khai Thiên Môn, Bá Thường Long Hồn, Vạn Thần Khí)
   */
  public playUltimate() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;

    // Sub rumble
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(120, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.5);
    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + 0.5);

    // Celestial rising arpeggio
    [440, 554.37, 659.25, 880, 1108.7].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.06);
      gain.gain.setValueAtTime(0.35, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.25);
    });
  }

  /**
   * Dimension Warp sound (2D / 3D / 4D Tesseract)
   */
  public playDimensionWarp(mode: '2d' | '3d' | '4d') {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (mode === '2d') {
      // Crisp retro 8-bit blip
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (mode === '3d') {
      // Holographic depth sweep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.18);
    } else {
      // 4D Cosmic Spacetime Phase-Shift
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.32);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.32);
    }
  }

  /**
   * Battle Start Horn / Gong
   */
  public playBattleStart() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    [261.63, 392.0, 523.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.4, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  /**
   * Victory Fanfare
   */
  public playWin() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 0.12 },
      { f: 783.99, d: 0.12, t: 0.24 },
      { f: 1046.5, d: 0.4, t: 0.36 },
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.45, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }

  /**
   * Defeat Sound
   */
  public playLose() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 392.0, t: 0 },
      { f: 369.99, t: 0.15 },
      { f: 349.23, t: 0.3 },
      { f: 293.66, t: 0.45 },
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.3, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + 0.22);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + n.t);
      osc.stop(now + n.t + 0.22);
    });
  }

  /**
   * Coin ping chime
   */
  public playCoin() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 987.77, t: 0 },
      { f: 1318.51, t: 0.08 },
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.4, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + 0.18);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + n.t);
      osc.stop(now + n.t + 0.18);
    });
  }

  /**
   * UI button click sound
   */
  public playClick() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, now);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // ==========================================
  // PROCEDURAL BATTLE BACKGROUND MUSIC (BGM)
  // ==========================================

  /**
   * Start procedural synthwave battle music
   */
  public startBGM() {
    if (this.isBgmPlaying || !this.settings.bgmEnabled || this.settings.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.isBgmPlaying = true;
    this.bgmStep = 0;

    // Rhythmic 16-step bass & arpeggio sequence in A minor
    const bassScale = [110, 110, 130.81, 110, 146.83, 110, 164.81, 146.83];
    const arpScale = [440, 523.25, 659.25, 880, 659.25, 523.25, 587.33, 493.88];
    const tempoMs = 150; // 100 BPM 16th notes

    const tick = () => {
      if (!this.isBgmPlaying) return;

      const currentCtx = this.ensureContext();
      if (currentCtx && this.bgmGain && !this.settings.muted && this.settings.bgmEnabled) {
        const t = currentCtx.currentTime;

        // Bass beat
        const bassNote = bassScale[this.bgmStep % bassScale.length];
        const bassOsc = currentCtx.createOscillator();
        const bassGain = currentCtx.createGain();
        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(bassNote / 2, t);
        bassGain.gain.setValueAtTime(0.18, t);
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        bassOsc.connect(bassGain);
        bassGain.connect(this.bgmGain);
        bassOsc.start(t);
        bassOsc.stop(t + 0.12);

        // Melodic synth arpeggio every 2 steps
        if (this.bgmStep % 2 === 0) {
          const arpNote = arpScale[(this.bgmStep / 2) % arpScale.length];
          const arpOsc = currentCtx.createOscillator();
          const arpGain = currentCtx.createGain();
          arpOsc.type = 'triangle';
          arpOsc.frequency.setValueAtTime(arpNote, t);
          arpGain.gain.setValueAtTime(0.14, t);
          arpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          arpOsc.connect(arpGain);
          arpGain.connect(this.bgmGain);
          arpOsc.start(t);
          arpOsc.stop(t + 0.1);
        }

        // Percussive kick / hi-hat click every 4 steps
        if (this.bgmStep % 4 === 0) {
          const kickOsc = currentCtx.createOscillator();
          const kickGain = currentCtx.createGain();
          kickOsc.type = 'sine';
          kickOsc.frequency.setValueAtTime(120, t);
          kickOsc.frequency.exponentialRampToValueAtTime(30, t + 0.08);
          kickGain.gain.setValueAtTime(0.3, t);
          kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
          kickOsc.connect(kickGain);
          kickGain.connect(this.bgmGain);
          kickOsc.start(t);
          kickOsc.stop(t + 0.08);
        }
      }

      this.bgmStep++;
      this.bgmTimer = window.setTimeout(tick, tempoMs);
    };

    tick();
  }

  /**
   * Stop background music
   */
  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer !== null) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  /**
   * Stellar Remote: Satellite terminal click & holographic menu open
   */
  public playStellarMenu() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    [1200, 1800, 2400].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      gain.gain.setValueAtTime(0.2, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.05);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.05);
    });
  }

  /**
   * SS-01: Orbital Railgun Light-speed Beam
   */
  public playOrbitalBeam() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.linearRampToValueAtTime(450, now + 0.15);
    osc.frequency.setValueAtTime(280, now + 0.3);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  /**
   * SS-03: Jupiter Planetary Core Rift
   */
  public playJupiterSplit() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  /**
   * SS-03: Tungsten Drill Rotary Spin Whine
   */
  public playTungstenDrillSpin() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(720, now + 0.6);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  /**
   * SS-03: Tungsten Rod Hypersonic Air Screech & Tsar Bomba Detonation
   */
  public playTsarBomba() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    // Massive sub-bass impact
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(20, now + 0.9);
    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    subOsc.connect(subGain);
    subGain.connect(this.sfxGain);
    subOsc.start(now);
    subOsc.stop(now + 0.9);

    // Crackling shockwave
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.7, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.2));
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.6, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    whiteNoise.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    whiteNoise.start(now);
  }

  /**
   * SS-04: Big Dipper Star Charge Ping
   */
  public playSevenStarCharge(starIdx = 1) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const baseFreq = 400 + (starIdx % 7) * 90;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.18);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  /**
   * SS-04: Celestial Meteor Impact (5000 DMG)
   */
  public playSevenStarImpact() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  /**
   * SS-04: Grand Unison 7-Star Supernova Blast (15000 DMG)
   */
  public playSevenStarSupernova() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 1.6, now + 0.4);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(now);
      osc.stop(now + 0.45);
    });
    this.playExplosion();
  }

  /**
   * SS-05: 4D Tesseract Pulse (6500 DMG per pulse)
   */
  public playTesseractPulse(pulseNum = 1) {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(180 + pulseNum * 40, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);
    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * SS-05: Tesseract Spacetime Collapse & Final Detonation (20000 DMG)
   */
  public playTesseractCollapse() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain || this.settings.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.65);
    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.7);
    this.playTsarBomba();
  }

  public toggleMute(): boolean {
    const next = !this.settings.muted;
    this.setMuted(next);
    return next;
  }
}

export const sound = new SoundEngine();
