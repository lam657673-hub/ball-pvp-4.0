import { WeaponKey, StellarCutsceneState, StellarOrbitalBeamState } from './types';

// Helper to compute rotated rectangle corner points
export function rotRectPts(cx: number, cy: number, length: number, width: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  const nx = -dy;
  const ny = dx;
  const hl = length / 2;
  const hw = width / 2;
  return [
    { x: cx - dx * hl - nx * hw, y: cy - dy * hl - ny * hw },
    { x: cx + dx * hl - nx * hw, y: cy + dy * hl - ny * hw },
    { x: cx + dx * hl + nx * hw, y: cy + dy * hl + ny * hw },
    { x: cx - dx * hl + nx * hw, y: cy - dy * hl + ny * hw }
  ];
}

export function drawPolygon(ctx: CanvasRenderingContext2D, pts: { x: number; y: number }[], fill = true, stroke = false) {
  if (pts.length === 0) return;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

export function drawWeaponIcon(ctx: CanvasRenderingContext2D, key: WeaponKey, x: number, y: number, size = 32) {
  ctx.save();
  ctx.translate(x, y);
  const scale = size / 64;
  ctx.scale(scale, scale);

  switch (key) {
    case 'kiem': {
      // Blade
      ctx.fillStyle = '#8a5a2b';
      drawPolygon(ctx, rotRectPts(16, 50, 22, 8, -45));
      ctx.fillStyle = '#555555';
      drawPolygon(ctx, rotRectPts(24, 40, 10, 3, 45));
      ctx.fillStyle = '#d8d8d8';
      drawPolygon(ctx, rotRectPts(42, 24, 34, 8, -45));
      break;
    }
    case 'riu': {
      ctx.fillStyle = '#6b4423';
      drawPolygon(ctx, rotRectPts(30, 34, 46, 5, -45));
      ctx.fillStyle = '#9a9a9a';
      ctx.beginPath();
      ctx.moveTo(38, 12);
      ctx.lineTo(56, 18);
      ctx.lineTo(42, 32);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(38, 12);
      ctx.lineTo(20, 18);
      ctx.lineTo(34, 30);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'khien': {
      ctx.fillStyle = '#4a90d9';
      const shieldPts = [
        { x: 32, y: 8 },
        { x: 52, y: 18 },
        { x: 52, y: 38 },
        { x: 32, y: 58 },
        { x: 12, y: 38 },
        { x: 12, y: 18 }
      ];
      ctx.strokeStyle = '#2a5a9a';
      ctx.lineWidth = 3;
      drawPolygon(ctx, shieldPts, true, true);
      break;
    }
    case 'cung': {
      ctx.strokeStyle = '#c99a5b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(32, 32, 26, (-70 * Math.PI) / 180, (70 * Math.PI) / 180, false);
      ctx.stroke();
      ctx.strokeStyle = '#e8dcc0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(23, 8);
      ctx.lineTo(23, 56);
      ctx.stroke();
      break;
    }
    case 'no': {
      ctx.strokeStyle = '#8a8a8a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(30, 32, 20, (-80 * Math.PI) / 180, (80 * Math.PI) / 180, false);
      ctx.stroke();
      ctx.fillStyle = '#6b4423';
      ctx.fillRect(30, 28, 26, 8);
      ctx.fillStyle = '#333333';
      ctx.fillRect(50, 26, 6, 12);
      break;
    }
    case 'giao': {
      ctx.fillStyle = '#8a8a8a';
      drawPolygon(ctx, rotRectPts(30, 40, 52, 4, -45));
      ctx.fillStyle = '#e0e0e0';
      ctx.beginPath();
      ctx.moveTo(48, 20);
      ctx.lineTo(60, 8);
      ctx.lineTo(56, 26);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'railgun': {
      ctx.fillStyle = '#3a4a5a';
      drawPolygon(ctx, rotRectPts(32, 32, 44, 14, -30));
      ctx.fillStyle = '#8a3a3a';
      drawPolygon(ctx, rotRectPts(32, 32, 30, 4, -30));
      ctx.fillStyle = '#6a4a9a';
      drawPolygon(ctx, rotRectPts(24, 40, 16, 3, 20));
      ctx.fillStyle = '#cccccc';
      ctx.beginPath();
      ctx.arc(50, 14, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'mace': {
      ctx.fillStyle = '#5a5a5a';
      drawPolygon(ctx, rotRectPts(20, 46, 30, 6, -45));
      ctx.fillStyle = '#8a8a8a';
      ctx.beginPath();
      ctx.arc(46, 20, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3a3a3a';
      for (let i = 0; i < 8; i++) {
        const a = ((Math.PI * 2) / 8) * i;
        ctx.fillRect(46 + Math.cos(a) * 14 - 2, 20 + Math.sin(a) * 14 - 2, 4, 4);
      }
      break;
    }
    case 'songthu': {
      ctx.fillStyle = '#8a8a8a';
      drawPolygon(ctx, rotRectPts(18, 46, 26, 4, -45));
      ctx.fillStyle = '#e0e0e0';
      ctx.beginPath();
      ctx.moveTo(30, 26);
      ctx.lineTo(40, 16);
      ctx.lineTo(36, 30);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#8a8a8a';
      ctx.beginPath();
      ctx.arc(48, 44, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3a3a3a';
      for (let i = 0; i < 6; i++) {
        const a = ((Math.PI * 2) / 6) * i;
        ctx.fillRect(48 + Math.cos(a) * 10 - 1.5, 44 + Math.sin(a) * 10 - 1.5, 3, 3);
      }
      break;
    }
    case 'minigun': {
      ctx.fillStyle = '#4a4a4a';
      for (let i = 0; i < 4; i++) ctx.fillRect(20 + i * 3, 14, 2, 36);
      ctx.fillStyle = '#2a2a2a';
      ctx.beginPath();
      ctx.arc(30, 12, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8a5a2b';
      ctx.fillRect(24, 46, 12, 10);
      break;
    }
    case 'sangthe': {
      ctx.fillStyle = '#ffd700';
      drawPolygon(ctx, rotRectPts(20, 50, 30, 8, -45));
      ctx.fillStyle = '#fff8dc';
      drawPolygon(ctx, rotRectPts(42, 22, 38, 10, -45));
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(52, 12, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'satna': {
      ctx.fillStyle = '#9a9a9a';
      drawPolygon(ctx, rotRectPts(28, 40, 46, 5, -55));
      ctx.fillStyle = '#c8c8c8';
      drawPolygon(ctx, rotRectPts(44, 12, 20, 2.5, -55));
      ctx.fillStyle = '#2a2a2a';
      drawPolygon(ctx, rotRectPts(12, 56, 16, 7, -55));
      ctx.fillStyle = '#707070';
      ctx.beginPath();
      ctx.arc(20, 48, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#b0b0b0';
      ctx.beginPath();
      ctx.arc(20, 48, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(221, 221, 221, 0.9)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(44, 12);
      ctx.lineTo(50, 4);
      ctx.stroke();
      ctx.strokeStyle = '#dddddd';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(51, 6, 3, 0, (270 * Math.PI) / 180, false);
      ctx.stroke();
      break;
    }
    case 'torch': {
      ctx.fillStyle = '#6b4423';
      drawPolygon(ctx, rotRectPts(24, 46, 30, 6, -55));
      ctx.fillStyle = '#ff6a1a';
      ctx.beginPath();
      ctx.arc(40, 18, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd23f';
      ctx.beginPath();
      ctx.arc(40, 18, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 248, 220, 0.8)';
      ctx.beginPath();
      ctx.arc(40, 15, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'combo': {
      // 2 boxing fists (Left & Right)
      // Left Fist
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(20, 32, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(12, 36, 16, 7);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(14, 26, 12, 4);

      // Right Fist (slightly offset/raised)
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(44, 24, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#c2410c';
      ctx.fillRect(36, 28, 16, 8);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(38, 18, 12, 4);

      // Speed lines / Impact spark
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(34, 10);
      ctx.lineTo(40, 4);
      ctx.moveTo(52, 14);
      ctx.lineTo(58, 8);
      ctx.stroke();
      break;
    }
    case 'songkiem': {
      // Left Katana (angled at -35 deg)
      ctx.fillStyle = '#1e293b';
      drawPolygon(ctx, rotRectPts(16, 50, 20, 6, -35));
      ctx.fillStyle = '#06b6d4';
      drawPolygon(ctx, rotRectPts(22, 42, 10, 3, 55));
      ctx.fillStyle = '#e2e8f0';
      drawPolygon(ctx, rotRectPts(38, 26, 36, 6, -35));
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.5;
      drawPolygon(ctx, rotRectPts(38, 26, 36, 6, -35), false, true);

      // Right Katana (crossed at 35 deg)
      ctx.fillStyle = '#1e293b';
      drawPolygon(ctx, rotRectPts(48, 50, 20, 6, 35));
      ctx.fillStyle = '#06b6d4';
      drawPolygon(ctx, rotRectPts(42, 42, 10, 3, -55));
      ctx.fillStyle = '#e2e8f0';
      drawPolygon(ctx, rotRectPts(26, 26, 36, 6, 35));
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      drawPolygon(ctx, rotRectPts(26, 26, 36, 6, 35), false, true);

      // Center cross spark
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(32, 34, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'cancau': {
      // Fishing Rod (Cần Câu)
      // 1. Carbon Rod Handle & Shaft (angled at -45 deg)
      ctx.fillStyle = '#1e293b';
      drawPolygon(ctx, rotRectPts(16, 52, 24, 7, -45));
      
      // Reel attachment (Máy câu)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(20, 48, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(20, 48, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Slender flexible rod shaft
      ctx.fillStyle = '#334155';
      drawPolygon(ctx, rotRectPts(36, 32, 34, 3.5, -45));
      ctx.fillStyle = '#64748b';
      drawPolygon(ctx, rotRectPts(50, 18, 16, 2, -45));

      // Rod Tip & Guide Ring
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(56, 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Fishing line dropping down with hook
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(56, 12);
      ctx.quadraticCurveTo(58, 28, 52, 42);
      ctx.stroke();

      // Red/White Bobber Float
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(54, 28, 3, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(54, 28, 3, 0, Math.PI);
      ctx.fill();

      // Shiny Steel Barbed Hook
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(50, 42, 4, 0, Math.PI * 0.9, false);
      ctx.stroke();
      break;
    }
    case 'tamkiem': {
      // 3 Katana Zoro Santoryu (Tam Kiếm)
      // 1. Left Katana (Sandai Kitetsu - red & black sheath, wave hamon)
      ctx.fillStyle = '#dc2626';
      drawPolygon(ctx, rotRectPts(14, 52, 22, 5, -40));
      ctx.fillStyle = '#fbbf24';
      drawPolygon(ctx, rotRectPts(20, 44, 9, 3, 50));
      ctx.fillStyle = '#f1f5f9';
      drawPolygon(ctx, rotRectPts(36, 26, 38, 5.5, -40));
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.2;
      drawPolygon(ctx, rotRectPts(36, 26, 38, 5.5, -40), false, true);

      // 2. Right Katana (Enma - purple & gold, flame hamon)
      ctx.fillStyle = '#7e22ce';
      drawPolygon(ctx, rotRectPts(50, 52, 22, 5, 40));
      ctx.fillStyle = '#fbbf24';
      drawPolygon(ctx, rotRectPts(44, 44, 9, 3, -50));
      ctx.fillStyle = '#f1f5f9';
      drawPolygon(ctx, rotRectPts(28, 26, 38, 5.5, 40));
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.2;
      drawPolygon(ctx, rotRectPts(28, 26, 38, 5.5, 40), false, true);

      // 3. Center Katana (Wado Ichimonji - pure white handle & sheath)
      ctx.fillStyle = '#ffffff';
      drawPolygon(ctx, rotRectPts(32, 56, 22, 5, 0));
      ctx.fillStyle = '#f59e0b';
      drawPolygon(ctx, rotRectPts(32, 44, 10, 3, 90));
      ctx.fillStyle = '#f8fafc';
      drawPolygon(ctx, rotRectPts(32, 22, 40, 5.5, 0));
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;
      drawPolygon(ctx, rotRectPts(32, 22, 40, 5.5, 0), false, true);

      // Zoro green bandana knot icon & slash flare
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(32, 44, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      break;
    }
    case 'computer': {
      // Laptop Hacker / Máy Tính (The Owner Game)
      // 1. Laptop Base Body
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1.5;
      drawPolygon(ctx, [
        { x: 12, y: 46 },
        { x: 52, y: 46 },
        { x: 58, y: 56 },
        { x: 6, y: 56 }
      ], true, true);

      // Keyboard & Trackpad
      ctx.fillStyle = '#1e293b';
      drawPolygon(ctx, [
        { x: 15, y: 48 },
        { x: 49, y: 48 },
        { x: 52, y: 52 },
        { x: 12, y: 52 }
      ]);
      ctx.fillStyle = '#334155';
      ctx.fillRect(28, 53, 8, 2.5);

      // 2. Laptop Screen Lid (Tilted Up)
      ctx.fillStyle = '#020617';
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.rect(14, 12, 36, 32);
      ctx.fill();
      ctx.stroke();

      // Screen Matrix Glitch Lines
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 6px monospace';
      ctx.fillText('>_ ROOT', 17, 20);
      ctx.fillText('010110', 17, 28);
      ctx.fillText('OWNER', 17, 36);

      // Hacker Cyber Halo
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#86efac';
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 14, 32, 28);
      ctx.shadowBlur = 0;
      break;
    }
    case 'daynit': {
      // Dây Nịt Tử Thần (The Owner Exclusive Weapon)
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 6;

      // 1. Heavy brown leather belt loop
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(14, 48);
      ctx.bezierCurveTo(16, 20, 42, 16, 44, 34);
      ctx.bezierCurveTo(46, 50, 24, 48, 28, 30);
      ctx.bezierCurveTo(30, 18, 52, 14, 56, 18);
      ctx.stroke();

      // 2. Fiery red-orange inner spine
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(14, 48);
      ctx.bezierCurveTo(16, 20, 42, 16, 44, 34);
      ctx.bezierCurveTo(46, 50, 24, 48, 28, 30);
      ctx.bezierCurveTo(30, 18, 52, 14, 56, 18);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // 3. Golden Buckle at belt head
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(8, 44, 12, 12, 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#451a03';
      ctx.fillRect(11, 48, 6, 4);

      // 4. Belt eyelets
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(22, 28, 1.2, 0, Math.PI * 2);
      ctx.arc(32, 22, 1.2, 0, Math.PI * 2);
      ctx.arc(40, 26, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // 5. Whip Crack Tail with Pain Sparks
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(56, 18);
      ctx.lineTo(60, 12);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(60, 12, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(62, 10, 1.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'thuongthan': {
      // Thương Thần (Long Đảm Thần Thương)
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      // Shaft - Dragon scale silver-gold pole
      ctx.fillStyle = '#facc15';
      drawPolygon(ctx, rotRectPts(30, 40, 54, 5, -45));
      ctx.fillStyle = '#e0f2fe';
      drawPolygon(ctx, rotRectPts(30, 40, 54, 2, -45));
      // Crimson silk tassel
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(46, 22, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(44, 25, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Giant celestial spear head
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(46, 20);
      ctx.lineTo(62, 4);
      ctx.lineTo(58, 28);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;
      break;
    }
    case 'than_songkiem': {
      // Thần Song Kiếm (Long Phụng Cặp Kiếm Thần Thoại)
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 8;
      // 1. Long Kiếm (Left - Golden Dragon Blade)
      ctx.fillStyle = '#78350f';
      drawPolygon(ctx, rotRectPts(16, 52, 18, 5, -40));
      ctx.fillStyle = '#f59e0b';
      drawPolygon(ctx, rotRectPts(22, 44, 8, 3, 50));
      ctx.fillStyle = '#fef08a';
      drawPolygon(ctx, rotRectPts(36, 26, 36, 6, -40));
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      // 2. Phụng Kiếm (Right - Cyan Phoenix Blade)
      ctx.shadowColor = '#38bdf8';
      ctx.fillStyle = '#0c4a6e';
      drawPolygon(ctx, rotRectPts(48, 52, 18, 5, 40));
      ctx.fillStyle = '#38bdf8';
      drawPolygon(ctx, rotRectPts(42, 44, 8, 3, -50));
      ctx.fillStyle = '#e0f2fe';
      drawPolygon(ctx, rotRectPts(28, 26, 36, 6, 40));
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;
      break;
    }
    case 'stellar_remote': {
      // Stellar Remote: Tactical Cosmic Orbital Controller
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      // Remote Body: Sleek dark obsidian-titanium bevel
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(14, 14, 36, 44, 8);
      ctx.fill();
      ctx.stroke();

      // Antenna with pulsing laser emitter
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(32, 14);
      ctx.lineTo(32, 4);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(32, 4, 3, 0, Math.PI * 2);
      ctx.fill();

      // Radar Screen (Holographic targeting circle)
      ctx.fillStyle = '#022c22';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(32, 32, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Crosshairs
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(32, 23);
      ctx.lineTo(32, 41);
      ctx.moveTo(23, 32);
      ctx.lineTo(41, 32);
      ctx.stroke();

      // Center glowing satellite transmitter beacon
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(32, 32, 3, 0, Math.PI * 2);
      ctx.fill();

      // 4 Tactical Command Buttons (SS-01, SS-03, SS-04, SS-05)
      ctx.fillStyle = '#ef4444'; // SS-01 Red
      ctx.fillRect(19, 47, 5, 4);
      ctx.fillStyle = '#f97316'; // SS-03 Orange
      ctx.fillRect(26, 47, 5, 4);
      ctx.fillStyle = '#eab308'; // SS-04 Gold
      ctx.fillRect(33, 47, 5, 4);
      ctx.fillStyle = '#a855f7'; // SS-05 Purple/Cyan
      ctx.fillRect(40, 47, 5, 4);

      ctx.shadowBlur = 0;
      break;
    }
    default: {
      if (typeof key === 'string' && key.startsWith('fusion_')) {
        const parts = key.replace('fusion_', '').split('_');
        if (parts.length === 2) {
          ctx.save();
          ctx.translate(-14, 0);
          ctx.scale(0.68, 0.68);
          drawWeaponIcon(ctx, parts[0] as WeaponKey, 0, 0, 64);
          ctx.restore();

          ctx.save();
          ctx.translate(14, 0);
          ctx.scale(0.68, 0.68);
          drawWeaponIcon(ctx, parts[1] as WeaponKey, 0, 0, 64);
          ctx.restore();

          // Fusion Golden Star Badge in Center
          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.arc(32, 32, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#1e1b4b';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+', 32, 32);
          break;
        }
      }
      // Fallback
      ctx.fillStyle = '#8a5a2b';
      drawPolygon(ctx, rotRectPts(16, 50, 22, 8, -45));
      ctx.fillStyle = '#d8d8d8';
      drawPolygon(ctx, rotRectPts(42, 24, 34, 8, -45));
      break;
    }
  }
  ctx.restore();
}

export function drawRuneRing(ctx: CanvasRenderingContext2D, radius: number, segments: number, color: string, alpha: number, thickness: number) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = thickness;
  const gap = 0.35;
  for (let i = 0; i < segments; i++) {
    const a0 = ((Math.PI * 2) / segments) * i;
    const a1 = a0 + ((Math.PI * 2) / segments) * (1 - gap);
    ctx.beginPath();
    ctx.arc(0, 0, radius, a0, a1, false);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawTaiji(ctx: CanvasRenderingContext2D, radius: number) {
  ctx.save();
  // White full circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Dark half
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2, false);
  ctx.fill();

  // Dark top circle
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(0, -radius / 2, radius / 2, 0, Math.PI * 2);
  ctx.fill();

  // White bottom circle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, radius / 2, radius / 2, 0, Math.PI * 2);
  ctx.fill();

  // Small inner dots
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, -radius / 2, radius / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(0, radius / 2, radius / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawFireCrack(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, segments = 10, jitter = 14) {
  const minW = 2;
  const maxW = 12;
  const pts: { x: number; y: number; t: number }[] = [{ x: x1, y: y1, t: 0 }];

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const bx = x1 + (x2 - x1) * t;
    const by = y1 + (y2 - y1) * t;
    const nx = -(y2 - y1);
    const ny = x2 - x1;
    const nlen = Math.hypot(nx, ny) || 1;
    const off = (Math.random() - 0.5) * jitter;
    pts.push({ x: bx + (nx / nlen) * off, y: by + (ny / nlen) * off, t });
  }
  pts.push({ x: x2, y: y2, t: 1 });

  const widthAt = (t: number) => minW + (maxW - minW) * (1 - Math.abs(t - 0.5) * 2);

  ctx.save();
  ctx.lineCap = 'round';
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const midT = (a.t + b.t) / 2;
    const w = widthAt(midT);

    // Layer 1: Outer Orange Glow
    ctx.strokeStyle = 'rgba(255, 106, 26, 0.5)';
    ctx.lineWidth = w + 5;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 2: Yellow Core
    ctx.strokeStyle = 'rgba(255, 210, 63, 0.9)';
    ctx.lineWidth = w + 1.5;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 3: Hot White Center
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(1, w * 0.35);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.restore();
}

// ----------------------------------------------------
// UPDATE 1.1.0: SỞ TÂN - NHẤT ĐIẾU KHAI THIÊN MÔN & TỨ THÁNH
// ----------------------------------------------------

// KỸ NĂNG MỚI: NHẤT ĐIẾU KHAI THIÊN MÔN - TỐI CAO ÁO NGHĨA (VẠN LUÂN CẦU VỒNG + TỨ TƯỢNG)
export function drawNhatDieuToiCaoRings(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radii: number[],
  rotations: number[],
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const rainbowColors = [
    '#ef4444', // Đỏ (Chu Sa)
    '#f97316', // Cam (Hỏa Tinh)
    '#eab308', // Vàng (Kim Quang)
    '#22c55e', // Lục (Thanh Mộc)
    '#06b6d4', // Lam (Hải Thủy)
    '#3b82f6', // Xanh Dương (Thiên Lam)
    '#8b5cf6', // Chàm (Tử Điện)
    '#d946ef', // Tím (Hư Không)
    '#f43f5e'  // Hồng Ngọc (Sáng Thế)
  ];

  const outerRadius = radii[radii.length - 1] || 110;

  // Outer Divine Rainbow Aurora Halo
  const haloGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, outerRadius + 45);
  haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  haloGrad.addColorStop(0.3, 'rgba(234, 179, 8, 0.35)');
  haloGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.25)');
  haloGrad.addColorStop(0.85, 'rgba(217, 70, 239, 0.15)');
  haloGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(0, 0, outerRadius + 45, 0, Math.PI * 2);
  ctx.fill();

  // Draw 8-9 layered rotating rainbow rings with alternating directions and celestial runes
  radii.forEach((radius, i) => {
    const rot = rotations[i] || 0;
    const numPoints = 8 + i * 4;
    const dir = i % 2 === 0 ? 1 : -1;
    const color = rainbowColors[i % rainbowColors.length];

    ctx.save();
    ctx.rotate(rot * dir);

    // Glowing Rainbow Base Ring
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.8 + (radii.length - i) * 0.4;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Sacred spikes / runic teeth on rainbow rings
    for (let p = 0; p < numPoints; p++) {
      const angle = (p / numPoints) * Math.PI * 2;
      const rx = Math.cos(angle) * radius;
      const ry = Math.sin(angle) * radius;

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(angle + Math.PI / 2);

      // Rainbow rune diamond spike
      ctx.fillStyle = p % 2 === 0 ? '#ffffff' : color;
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(4, 3);
      ctx.lineTo(0, 6);
      ctx.lineTo(-4, 3);
      ctx.closePath();
      ctx.fill();

      // Shimmering micro star
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  });

  // Central Hyper-Luminous Prismatic Star Core
  ctx.save();
  ctx.rotate((rotations[0] || 0) * 3);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  for (let s = 0; s < 12; s++) {
    const a = (s / 12) * Math.PI * 2;
    const r = s % 2 === 0 ? 22 : 9;
    const sx = Math.cos(a) * r;
    const sy = Math.sin(a) * r;
    if (s === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();

  // ----------------------------------------------------
  // 4 GÓC TỨ TƯỢNG (Thanh Long, Bạch Hổ, Chu Tước, Huyền Vũ)
  // ----------------------------------------------------
  const beastDist = outerRadius + 38;
  const beasts = [
    {
      name: 'THANH LONG',
      angle: -Math.PI * 0.75, // Góc Trên - Trái (Tây Bắc / Đông)
      color: '#10b981',
      bg: 'rgba(6, 78, 59, 0.92)',
      border: '#34d399',
      symbol: '🐉'
    },
    {
      name: 'BẠCH HỔ',
      angle: -Math.PI * 0.25, // Góc Trên - Phải (Đông Bắc / Tây)
      color: '#f8fafc',
      bg: 'rgba(30, 41, 59, 0.92)',
      border: '#e2e8f0',
      symbol: '🐯'
    },
    {
      name: 'CHU TƯỚC',
      angle: Math.PI * 0.25,  // Góc Dưới - Phải (Đông Nam / Nam)
      color: '#ef4444',
      bg: 'rgba(127, 29, 29, 0.92)',
      border: '#f87171',
      symbol: '🦅'
    },
    {
      name: 'HUYỀN VŨ',
      angle: Math.PI * 0.75,  // Góc Dưới - Trái (Tây Nam / Bắc)
      color: '#06b6d4',
      bg: 'rgba(14, 116, 144, 0.92)',
      border: '#38bdf8',
      symbol: '🐢'
    }
  ];

  beasts.forEach((beast, idx) => {
    const float = Math.sin(now * 0.006 + idx * 1.5) * 4;
    const bx = Math.cos(beast.angle) * (beastDist + float);
    const by = Math.sin(beast.angle) * (beastDist + float);

    ctx.save();
    ctx.translate(bx, by);

    // Outer Aura Pulse
    ctx.shadowColor = beast.border;
    ctx.shadowBlur = 16;
    ctx.fillStyle = beast.bg;
    ctx.strokeStyle = beast.border;
    ctx.lineWidth = 2.5;

    // Sacred Beast Crest Circle
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Beast Emoji / Sacred Silhouette
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(beast.symbol, 0, 1);

    // Beast Name Ribbon / Badge
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.strokeStyle = beast.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-36, 22, 72, 16, 6);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = beast.color;
    ctx.fillText(beast.name, 0, 31);

    ctx.restore();
  });

  ctx.restore();
}

export function drawSoTanGoldenRings(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radii: number[],
  rotations: number[]
) {
  ctx.save();
  ctx.translate(x, y);

  // Outer Divine Halo
  const haloGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, radii[radii.length - 1] + 25);
  haloGrad.addColorStop(0, 'rgba(250, 204, 21, 0.45)');
  haloGrad.addColorStop(0.6, 'rgba(234, 179, 8, 0.2)');
  haloGrad.addColorStop(1, 'rgba(202, 138, 4, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(0, 0, radii[radii.length - 1] + 25, 0, Math.PI * 2);
  ctx.fill();

  // Draw 4-5 layered rotating rings with alternating directions and golden sacred runes
  radii.forEach((radius, i) => {
    const rot = rotations[i] || 0;
    const numPoints = 8 + i * 4;
    const dir = i % 2 === 0 ? 1 : -1;

    ctx.save();
    ctx.rotate(rot * dir);

    // Glowing Golden Base Ring
    ctx.strokeStyle = i % 2 === 0 ? '#fde047' : '#eab308';
    ctx.lineWidth = 2.5 + (radii.length - i) * 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Sacred spikes / runic teeth on rings
    for (let p = 0; p < numPoints; p++) {
      const angle = (p / numPoints) * Math.PI * 2;
      const rx = Math.cos(angle) * radius;
      const ry = Math.sin(angle) * radius;

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(angle + Math.PI / 2);

      // Gold rune spike
      ctx.fillStyle = p % 2 === 0 ? '#ffffff' : '#facc15';
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(3.5, 3);
      ctx.lineTo(-3.5, 3);
      ctx.closePath();
      ctx.fill();

      // Small light circle
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  });

  // Central Golden Star Core
  ctx.save();
  ctx.rotate(rotations[0] * 2);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2;
    const r = s % 2 === 0 ? 16 : 7;
    const sx = Math.cos(a) * r;
    const sy = Math.sin(a) * r;
    if (s === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// Massive Golden Ground Fissure (Vết nứt cực to)
export function drawMassiveFissure(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lifeRatio: number
) {
  const segments = 16;
  const jitter = 28;
  const pts: { x: number; y: number; t: number }[] = [{ x: x1, y: y1, t: 0 }];

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const bx = x1 + (x2 - x1) * t;
    const by = y1 + (y2 - y1) * t;
    const nx = -(y2 - y1);
    const ny = x2 - x1;
    const nlen = Math.hypot(nx, ny) || 1;
    const off = (Math.sin(i * 3.7) + (i % 2 === 0 ? 1 : -1)) * (jitter / 2);
    pts.push({ x: bx + (nx / nlen) * off, y: by + (ny / nlen) * off, t });
  }
  pts.push({ x: x2, y: y2, t: 1 });

  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, lifeRatio));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const midT = (a.t + b.t) / 2;
    const maxW = 28;
    const minW = 6;
    const w = minW + (maxW - minW) * (1 - Math.abs(midT - 0.5) * 1.8);

    // Layer 1: Huge Radiant Golden Glow
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.45)';
    ctx.lineWidth = w + 16;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 2: Hot Amber Magma
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = w + 6;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 3: Blazing Golden Core
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();

    // Layer 4: Pure White Laser Fissure Center
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(2, w * 0.4);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();
}

// Massive Straight Fissure (Vết nứt thẳng Tối Cao Áo Nghĩa - Cầu Vồng / Kim Quang)
export function drawStraightFissure(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  lifeRatio: number,
  now: number,
  theme: 'rainbow' | 'golden' = 'rainbow',
  remainingPool?: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, lifeRatio));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  // Layer 1: Radiant Prismatic Halo
  const isGold = theme === 'golden';
  const rainbowColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'];
  const goldColors = ['#f59e0b', '#fbbf24', '#facc15', '#fde047', '#fef08a'];
  const pulseColor = isGold 
    ? goldColors[Math.floor((now * 0.006) % goldColors.length)]
    : rainbowColors[Math.floor((now * 0.005) % rainbowColors.length)];

  ctx.shadowColor = pulseColor;
  ctx.shadowBlur = 24;
  ctx.strokeStyle = pulseColor;
  ctx.lineWidth = isGold ? 28 : 36;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Layer 2: Straight Crystalline Rift Core
  ctx.strokeStyle = isGold ? '#fef08a' : '#facc15';
  ctx.lineWidth = isGold ? 14 : 18;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Layer 3: Ultra Pure White Dimensional Cut
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Layer 4: Vertical Rising Prism Rays / Energy Spikes along the straight line
  const numRays = 18;
  const activePalette = isGold ? goldColors : rainbowColors;
  for (let i = 1; i < numRays; i++) {
    const t = i / numRays;
    const rx = x1 + dx * t;
    const ry = y1 + dy * t;
    const rayLen = 14 + Math.sin(now * 0.008 + i * 1.3) * 10;
    const rayColor = activePalette[i % activePalette.length];

    ctx.strokeStyle = rayColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rx - nx * rayLen, ry - ny * rayLen);
    ctx.lineTo(rx + nx * rayLen, ry + ny * rayLen);
    ctx.stroke();

    // Small Diamond Sparkle
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layer 5: Remaining Damage Pool Indicator (if permanent until depleted)
  if (remainingPool !== undefined && remainingPool > 0) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = isGold ? '#fef08a' : '#ffffff';
    ctx.shadowColor = isGold ? '#f59e0b' : '#38bdf8';
    ctx.shadowBlur = 10;
    const label = isGold 
      ? `✨ VẾT NỨT HOÀNG KIM: ${Math.round(remainingPool)} DMG`
      : `🌈 VẾT NỨT CÀN KHÔN: ${Math.round(remainingPool)} DMG`;
    ctx.fillText(label, midX, midY - 14);
  }

  ctx.restore();
}

// Four Sacred Beasts Spirit Aura (Tứ Thánh Thần Thú)
export function drawBeastSpirit(
  ctx: CanvasRenderingContext2D,
  beast: {
    type: 'bach_ho' | 'chu_tuoc' | 'thanh_long' | 'huyen_vu';
    title: string;
    desc: string;
    spawnAt: number;
    duration: number;
    x: number;
    y: number;
  },
  now: number
) {
  const elapsed = now - beast.spawnAt;
  const progress = Math.min(1, Math.max(0, elapsed / beast.duration));
  const alpha = progress < 0.15 ? progress / 0.15 : progress > 0.75 ? (1 - progress) / 0.25 : 1;

  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  const floatY = Math.sin(now * 0.006) * 6;
  const bx = beast.x;
  const by = beast.y - 48 + floatY;

  // Banner background
  const bannerW = 210;
  const bannerH = 46;
  const rx = bx - bannerW / 2;
  const ry = by - bannerH / 2;

  let bannerBg = 'rgba(15, 23, 42, 0.92)';
  let borderColor = '#facc15';
  let titleColor = '#fef08a';

  if (beast.type === 'bach_ho') {
    bannerBg = 'rgba(30, 41, 59, 0.95)';
    borderColor = '#f8fafc';
    titleColor = '#ffffff';
  } else if (beast.type === 'chu_tuoc') {
    bannerBg = 'rgba(69, 10, 10, 0.95)';
    borderColor = '#ef4444';
    titleColor = '#fca5a5';
  } else if (beast.type === 'thanh_long') {
    bannerBg = 'rgba(6, 78, 59, 0.95)';
    borderColor = '#10b981';
    titleColor = '#6ee7b7';
  } else if (beast.type === 'huyen_vu') {
    bannerBg = 'rgba(20, 83, 45, 0.95)';
    borderColor = '#22c55e';
    titleColor = '#86efac';
  }

  // Shadow / Glow
  ctx.shadowColor = borderColor;
  ctx.shadowBlur = 18;
  ctx.fillStyle = bannerBg;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(rx, ry, bannerW, bannerH, 12);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Text
  ctx.textAlign = 'center';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = titleColor;
  ctx.fillText(beast.title, bx, ry + 18);

  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = '#fef3c7';
  ctx.fillText(beast.desc, bx, ry + 34);

  // Icon symbol on left
  ctx.font = '18px sans-serif';
  const icon = beast.type === 'bach_ho' ? '🐅' : beast.type === 'chu_tuoc' ? '🦅' : beast.type === 'thanh_long' ? '🐉' : '🐢';
  ctx.fillText(icon, rx + 18, ry + 28);

  ctx.restore();
}

export function drawHuyenVuShield(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  const pulse = Math.sin(now * 0.008) * 3;
  const shieldRadius = radius + 9 + pulse;

  // Hexagonal Turtle Shell Matrix
  ctx.shadowColor = 'rgba(34, 197, 94, 0.9)';
  ctx.shadowBlur = 16;
  ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 3;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 + now * 0.002;
    const px = x + Math.cos(angle) * shieldRadius;
    const py = y + Math.sin(angle) * shieldRadius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner Tortoise Rune Ring
  ctx.strokeStyle = 'rgba(240, 253, 244, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, shieldRadius - 4, 0, Math.PI * 2);
  ctx.stroke();

  // Label
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = '#86efac';
  ctx.textAlign = 'center';
  ctx.fillText('🐢 [HUYỀN VŨ BẤT TỬ]', x, y + shieldRadius + 14);

  ctx.restore();
}

// ----------------------------------------------------
// PROJECTILES & WEAPON FX (Cung, Nỏ, Song Kiếm, Sáng Thế)
// ----------------------------------------------------

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  color = '#c99a5b'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Motion blur / trail line
  ctx.strokeStyle = 'rgba(201, 154, 91, 0.35)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(0, 0);
  ctx.stroke();

  // Wooden shaft
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-16, 0);
  ctx.lineTo(10, 0);
  ctx.stroke();

  // Arrowhead (Sharp Steel Triangle)
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.lineTo(8, -4);
  ctx.lineTo(9, 0);
  ctx.lineTo(8, 4);
  ctx.closePath();
  ctx.fill();

  // Feathers / Fletching
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(-18, -4);
  ctx.lineTo(-12, 0);
  ctx.lineTo(-18, 4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function drawCrossbowBolt(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  color = '#ef4444'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Power Glow / Tracer
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;

  // Heavy steel shaft
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(8, 0);
  ctx.stroke();

  // Inner energy core
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-16, 0);
  ctx.lineTo(10, 0);
  ctx.stroke();

  // Diamond piercing steel bolt head
  ctx.fillStyle = '#fca5a5';
  ctx.beginPath();
  ctx.moveTo(16, 0);
  ctx.lineTo(8, -5);
  ctx.lineTo(10, 0);
  ctx.lineTo(8, 5);
  ctx.closePath();
  ctx.fill();

  // Metallic back fins
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(-19, -5);
  ctx.lineTo(-15, 0);
  ctx.lineTo(-19, 5);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function drawSongKiemSlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  radius = 24,
  slashIndex = 0,
  now = 0
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const mainColor = slashIndex === 0 ? '#22d3ee' : '#38bdf8';
  const glowColor = slashIndex === 0 ? 'rgba(6, 182, 212, 0.8)' : 'rgba(14, 165, 233, 0.8)';

  ctx.shadowColor = mainColor;
  ctx.shadowBlur = 15;

  // Outer Crescent Energy Arc
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, radius, -0.65 * Math.PI, 0.65 * Math.PI, false);
  ctx.stroke();

  // Inner Blazing White Edge
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius, -0.55 * Math.PI, 0.55 * Math.PI, false);
  ctx.stroke();

  // Energy Blade Wings
  ctx.fillStyle = mainColor;
  ctx.beginPath();
  ctx.moveTo(Math.cos(-0.65 * Math.PI) * radius, Math.sin(-0.65 * Math.PI) * radius);
  ctx.lineTo(Math.cos(-0.65 * Math.PI) * radius - 8, Math.sin(-0.65 * Math.PI) * radius - 4);
  ctx.lineTo(Math.cos(-0.5 * Math.PI) * (radius - 5), Math.sin(-0.5 * Math.PI) * (radius - 5));
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(Math.cos(0.65 * Math.PI) * radius, Math.sin(0.65 * Math.PI) * radius);
  ctx.lineTo(Math.cos(0.65 * Math.PI) * radius - 8, Math.sin(0.65 * Math.PI) * radius + 4);
  ctx.lineTo(Math.cos(0.5 * Math.PI) * (radius - 5), Math.sin(0.5 * Math.PI) * (radius - 5));
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Render Skill 2: [NHẤT QUANG] - Luồng kiếm khí khổng lồ xé toạc chiến trường
 */
export function drawSongKiemNhatQuang(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  radius = 68,
  now = 0
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // 1. Massive Holy & Celestial Cyan Aura
  ctx.shadowColor = '#00f2ff';
  ctx.shadowBlur = 30;

  // Outer Colossal Energy Arc
  const grad = ctx.createLinearGradient(-30, 0, 30, 0);
  grad.addColorStop(0, '#facc15');
  grad.addColorStop(0.5, '#22d3ee');
  grad.addColorStop(1, '#ffffff');

  ctx.strokeStyle = 'rgba(6, 182, 212, 0.9)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(0, 0, radius, -0.72 * Math.PI, 0.72 * Math.PI, false);
  ctx.stroke();

  // Secondary Gold / Cyan Radiant Rim
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 4, -0.68 * Math.PI, 0.68 * Math.PI, false);
  ctx.stroke();

  // Inner Ultra-Bright Blazing White Razor Edge
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 2, -0.62 * Math.PI, 0.62 * Math.PI, false);
  ctx.stroke();

  // Giant Sword Crest / Center Blade Spike
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(radius + 12, 0);
  ctx.lineTo(radius - 12, -18);
  ctx.lineTo(radius - 4, 0);
  ctx.lineTo(radius - 12, 18);
  ctx.closePath();
  ctx.fill();

  // Trailing Divine Slash Wings
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(Math.cos(-0.72 * Math.PI) * radius, Math.sin(-0.72 * Math.PI) * radius);
  ctx.lineTo(Math.cos(-0.72 * Math.PI) * radius - 24, Math.sin(-0.72 * Math.PI) * radius - 14);
  ctx.lineTo(Math.cos(-0.55 * Math.PI) * (radius - 12), Math.sin(-0.55 * Math.PI) * (radius - 12));
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(Math.cos(0.72 * Math.PI) * radius, Math.sin(0.72 * Math.PI) * radius);
  ctx.lineTo(Math.cos(0.72 * Math.PI) * radius - 24, Math.sin(0.72 * Math.PI) * radius + 14);
  ctx.lineTo(Math.cos(0.55 * Math.PI) * (radius - 12), Math.sin(0.55 * Math.PI) * (radius - 12));
  ctx.closePath();
  ctx.fill();

  // Light Rays from Crescent
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 2;
  for (let i = -3; i <= 3; i++) {
    const a = (i * 0.2) * Math.PI * 0.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * (radius - 10), Math.sin(a) * (radius - 10));
    ctx.lineTo(Math.cos(a) * (radius + 20), Math.sin(a) * (radius + 20));
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Hiệu ứng đứng im tích tụ năng lượng Nhất Quang
 */
export function drawSongKiemChargeAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  chargeProgress: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  // 1. Concentric gathering rings collapsing into ball
  const ringCount = 3;
  for (let i = 0; i < ringCount; i++) {
    const cycle = ((now * 0.002 + i / ringCount) % 1);
    const radius = 60 * (1 - cycle);
    const alpha = cycle * 0.8;

    ctx.strokeStyle = i % 2 === 0 ? 'rgba(34, 211, 238, ' + alpha + ')' : 'rgba(250, 204, 21, ' + alpha + ')';
    ctx.lineWidth = 2 + (1 - cycle) * 2;
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(1, radius), 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Rotating Radiant Sword Rays
  const rayAngle = now * 0.005;
  ctx.rotate(rayAngle);
  ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.5 + 0.5 * Math.sin(now * 0.02)) + ')';
  ctx.lineWidth = 1.5;
  const rayLength = 30 + chargeProgress * 35;
  for (let j = 0; j < 8; j++) {
    const a = (j * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 14, Math.sin(a) * 14);
    ctx.lineTo(Math.cos(a) * rayLength, Math.sin(a) * rayLength);
    ctx.stroke();
  }

  // 3. Center Glowing Energy Core
  ctx.shadowColor = '#22d3ee';
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.4 + 0.5 * chargeProgress) + ')';
  ctx.beginPath();
  ctx.arc(0, 0, 16 + chargeProgress * 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawHolySlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  startTime: number,
  now: number,
  duration = 450
) {
  const elapsed = now - startTime;
  if (elapsed < 0 || elapsed > duration) return;
  const progress = elapsed / duration;
  const alpha = Math.max(0, 1 - progress);

  ctx.save();
  ctx.globalAlpha = alpha;

  // 1. Divine Pillar of Holy Genesis Light (From top of screen down)
  const pillarGrad = ctx.createLinearGradient(x, 0, x, y);
  pillarGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  pillarGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.7)');
  pillarGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

  ctx.fillStyle = pillarGrad;
  const pillarW = 28 * (1 - progress * 0.4);
  ctx.fillRect(x - pillarW / 2, 0, pillarW, y + 20);

  // 2. Grand Holy Cross Slash on Target
  const slashLen = 70 + progress * 50;
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 25;

  // Diagonal Slash 1 (\)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8 * (1 - progress);
  ctx.beginPath();
  ctx.moveTo(x - slashLen * 0.7, y - slashLen * 0.7);
  ctx.lineTo(x + slashLen * 0.7, y + slashLen * 0.7);
  ctx.stroke();

  // Diagonal Slash 2 (/)
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 6 * (1 - progress);
  ctx.beginPath();
  ctx.moveTo(x + slashLen * 0.7, y - slashLen * 0.7);
  ctx.lineTo(x - slashLen * 0.7, y + slashLen * 0.7);
  ctx.stroke();

  // Center Genesis Sunburst Halo
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 16 * (1 - progress), 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawLienHoanKichSlashFx(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hitCount: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const angle = ((hitCount % 4) * Math.PI) / 4 + (now * 0.01);
  ctx.rotate(angle);

  const colors = ['#22d3ee', '#38bdf8', '#facc15', '#f43f5e'];
  const curColor = colors[hitCount % colors.length];

  ctx.shadowColor = curColor;
  ctx.shadowBlur = 18;

  // Double X-slash trails
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-35, -20);
  ctx.lineTo(35, 20);
  ctx.moveTo(-35, 20);
  ctx.lineTo(35, -20);
  ctx.stroke();

  ctx.strokeStyle = curColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-45, 0);
  ctx.lineTo(45, 0);
  ctx.stroke();

  // Hit Spark / Flash
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ hình thái Long Nhân Hợp Nhất của Bá Thường
 * Tái hiện chi tiết khuôn mặt, tóc rồng đen tỏa tủa, sừng rồng ngà, mắt rồng hoàng kim với vảy ngọc, tai nhọn và cánh tay rồng vảy xanh
 */
export function drawDragonHumanAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  // 1. Dragon Chi Emerald Flame Aura & Ambient Glow
  const pulse = Math.sin(now * 0.01) * 2.5;
  const grad = ctx.createRadialGradient(0, 0, radius * 0.4, 0, 0, radius + 14 + pulse);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
  grad.addColorStop(0.65, 'rgba(5, 150, 105, 0.25)');
  grad.addColorStop(1, 'rgba(4, 120, 87, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius + 14 + pulse, 0, Math.PI * 2);
  ctx.fill();

  // 2. Green T-shirt / Tunic at bottom
  ctx.fillStyle = '#16a34a';
  ctx.beginPath();
  ctx.moveTo(-radius * 0.75, radius * 0.45);
  ctx.quadraticCurveTo(0, radius * 0.35, radius * 0.75, radius * 0.45);
  ctx.lineTo(radius * 0.85, radius * 1.05);
  ctx.lineTo(-radius * 0.85, radius * 1.05);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // T-shirt collar
  ctx.strokeStyle = '#14532d';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, radius * 0.45, radius * 0.35, 0, Math.PI);
  ctx.stroke();

  // 3. Left Pointed Elf / Dragon Ear
  ctx.fillStyle = '#fed7aa';
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(radius * 0.7, -radius * 0.2);
  ctx.quadraticCurveTo(radius * 1.35, -radius * 0.1, radius * 1.45, radius * 0.3);
  ctx.quadraticCurveTo(radius * 1.0, radius * 0.45, radius * 0.65, radius * 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Ear inner shadow & teal scale accent at ear base
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(radius * 0.8, radius * 0.25, 3, 0, Math.PI * 2);
  ctx.fill();

  // 4. Wild Spiky Dragon Hair (Top, Back, and Side locks flowing upwards)
  ctx.fillStyle = '#09090b';
  ctx.strokeStyle = '#18181b';
  ctx.lineWidth = 1.5;

  const hairLocks = [
    // Left side locks
    [[-radius * 0.9, -radius * 0.1], [-radius * 1.4, -radius * 0.8], [-radius * 0.7, -radius * 0.9]],
    [[-radius * 0.8, -radius * 0.6], [-radius * 1.3, -radius * 1.4], [-radius * 0.4, -radius * 1.2]],
    // Top spike locks
    [[-radius * 0.5, -radius * 1.0], [-radius * 0.7, -radius * 1.8], [-radius * 0.1, -radius * 1.5]],
    [[-radius * 0.2, -radius * 1.2], [0, -radius * 2.0], [radius * 0.3, -radius * 1.5]],
    [[radius * 0.1, -radius * 1.3], [radius * 0.5, -radius * 1.8], [radius * 0.6, -radius * 1.3]],
    // Right flowing locks
    [[radius * 0.5, -radius * 0.9], [radius * 1.3, -radius * 1.3], [radius * 0.9, -radius * 0.5]],
    [[radius * 0.7, -radius * 0.4], [radius * 1.4, -radius * 0.6], [radius * 0.85, 0]]
  ];

  hairLocks.forEach(pts => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    ctx.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // 5. Majestic Ivory Dragon Horn (Antler with branches on top-right)
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(radius * 0.35, -radius * 0.75);
  ctx.quadraticCurveTo(radius * 0.85, -radius * 1.45, radius * 1.4, -radius * 1.25);
  ctx.quadraticCurveTo(radius * 1.0, -radius * 0.9, radius * 0.55, -radius * 0.55);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Branch prong on horn
  ctx.beginPath();
  ctx.moveTo(radius * 0.8, -radius * 1.15);
  ctx.quadraticCurveTo(radius * 1.15, -radius * 1.55, radius * 1.3, -radius * 1.5);
  ctx.lineTo(radius * 0.95, -radius * 1.1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Horn textured segment ridges
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 4; i++) {
    const frac = 0.55 + i * 0.18;
    ctx.beginPath();
    ctx.moveTo(radius * frac, -radius * (0.8 + i * 0.12));
    ctx.lineTo(radius * (frac + 0.15), -radius * (0.95 + i * 0.12));
    ctx.stroke();
  }

  // 6. Facial Features (Left stoic human side)
  // Left Eyebrow & Stoic Eye
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(radius * 0.12, -radius * 0.22);
  ctx.quadraticCurveTo(radius * 0.32, -radius * 0.32, radius * 0.52, -radius * 0.2);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(radius * 0.32, -radius * 0.08, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(radius * 0.34, -radius * 0.1, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Nose contour
  ctx.strokeStyle = '#c2410c';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.05);
  ctx.lineTo(radius * 0.08, radius * 0.1);
  ctx.lineTo(-radius * 0.02, radius * 0.14);
  ctx.stroke();

  // Determined mouth line
  ctx.strokeStyle = '#9a3412';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-radius * 0.15, radius * 0.28);
  ctx.lineTo(radius * 0.25, radius * 0.26);
  ctx.stroke();

  // 7. Emerald Dragon Scales Half-Mask & Glowing Slit Eye on the Right Side
  // Scale Mask Base
  const scaleGrad = ctx.createLinearGradient(-radius * 0.9, -radius * 0.4, 0, radius * 0.4);
  scaleGrad.addColorStop(0, '#047857');
  scaleGrad.addColorStop(0.5, '#10b981');
  scaleGrad.addColorStop(1, '#34d399');
  ctx.fillStyle = scaleGrad;

  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.6);
  ctx.quadraticCurveTo(-radius * 0.8, -radius * 0.7, -radius * 0.9, -radius * 0.1);
  ctx.quadraticCurveTo(-radius * 0.95, radius * 0.4, -radius * 0.4, radius * 0.45);
  ctx.quadraticCurveTo(-radius * 0.1, radius * 0.2, 0, -radius * 0.1);
  ctx.closePath();
  ctx.fill();

  // Individual dragon scales texture
  ctx.strokeStyle = 'rgba(6, 78, 59, 0.65)';
  ctx.lineWidth = 1;
  const scales = [
    [-radius * 0.3, -radius * 0.45],
    [-radius * 0.6, -radius * 0.4],
    [-radius * 0.75, -radius * 0.1],
    [-radius * 0.65, radius * 0.15],
    [-radius * 0.45, radius * 0.3],
    [-radius * 0.25, radius * 0.15]
  ];
  scales.forEach(([sx, sy]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, 3.5, 0, Math.PI);
    ctx.stroke();
  });

  // Dragon Armor Eyebrow Plate
  ctx.fillStyle = '#065f46';
  ctx.strokeStyle = '#6ee7b7';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.3);
  ctx.lineTo(-radius * 0.55, -radius * 0.42);
  ctx.lineTo(-radius * 0.8, -radius * 0.25);
  ctx.lineTo(-radius * 0.5, -radius * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Glowing Dragon Slit Eye (Mắt Rồng Hoàng Kim Rực Sáng)
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.ellipse(-radius * 0.42, -radius * 0.12, 6.5, 4, -Math.PI / 10, 0, Math.PI * 2);
  ctx.fill();

  // Slit pupil
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.ellipse(-radius * 0.42, -radius * 0.12, 1.4, 3.8, -Math.PI / 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;

  // 8. Scaled Dragon Arm (Left Arm reaching forward gripping handle)
  const armGrad = ctx.createLinearGradient(-radius * 0.8, radius * 0.3, -radius * 0.4, radius * 0.8);
  armGrad.addColorStop(0, '#0f766e');
  armGrad.addColorStop(0.5, '#14b8a6');
  armGrad.addColorStop(1, '#5eead4');
  ctx.fillStyle = armGrad;
  ctx.strokeStyle = '#115e59';
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(-radius * 0.7, radius * 0.4);
  ctx.quadraticCurveTo(-radius * 1.15, radius * 0.6, -radius * 0.95, radius * 0.85);
  ctx.lineTo(-radius * 0.65, radius * 0.75);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dragon Clawed Hand
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.arc(-radius * 0.95, radius * 0.82, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Claw tips
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-radius * 1.05, radius * 0.8);
  ctx.lineTo(-radius * 1.15, radius * 0.85);
  ctx.lineTo(-radius * 1.02, radius * 0.9);
  ctx.fill();

  ctx.restore();
}

/**
 * Render dây câu và lưỡi câu bay/kéo/đập tường cho skill [MÓC LƯỠI] của Cần Câu
 */
export function drawFishingHookAndLine(
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  hookX: number,
  hookY: number,
  state: 'throwing' | 'pulling' | 'smashing',
  ownerRole: string | null,
  now: number
) {
  ctx.save();

  const isSoTan = ownerRole === 'sotan';
  const isBaThuong = ownerRole === 'bathuong';

  // Determine line & aura styling based on Role
  let lineCol = '#e2e8f0';
  let hookCol = '#94a3b8';
  let glowCol = 'rgba(255, 255, 255, 0.4)';

  if (isSoTan) {
    lineCol = '#facc15';
    hookCol = '#fef08a';
    glowCol = 'rgba(250, 204, 21, 0.8)';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 14;
  } else if (isBaThuong) {
    lineCol = '#34d399';
    hookCol = '#a7f3d0';
    glowCol = 'rgba(52, 211, 153, 0.8)';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 16;
  }

  // 1. Dynamic curved fishing line with physics sag/tension
  const midX = (ballX + hookX) / 2;
  const sag = state === 'pulling' ? Math.sin(now * 0.05) * 4 : Math.sin(now * 0.02) * 16 + 10;
  const midY = (ballY + hookY) / 2 + sag;

  // Outer glowing glow line if active skill
  ctx.strokeStyle = glowCol;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(ballX, ballY - 14);
  ctx.quadraticCurveTo(midX, midY, hookX, hookY);
  ctx.stroke();

  // Core taut fishing wire
  ctx.strokeStyle = lineCol;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(ballX, ballY - 14);
  ctx.quadraticCurveTo(midX, midY, hookX, hookY);
  ctx.stroke();

  // 2. Bobber Float on line midpoint
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(midX, midY, 4, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(midX, midY, 4, 0, Math.PI);
  ctx.fill();

  // 3. Steel Barbed Hook at (hookX, hookY)
  ctx.save();
  ctx.translate(hookX, hookY);
  const hookAngle = Math.atan2(hookY - (ballY - 14), hookX - ballX);
  ctx.rotate(hookAngle);

  // Hook Eyelet
  ctx.strokeStyle = hookCol;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(-8, 0, 3, 0, Math.PI * 2);
  ctx.stroke();

  // Hook Shank & Curved Barb
  ctx.beginPath();
  ctx.moveTo(-5, 0);
  ctx.lineTo(4, 0);
  ctx.arc(4, 5, 5, -Math.PI / 2, Math.PI / 2, false);
  ctx.lineTo(-2, 10);
  ctx.stroke();

  // Sharp barb point
  ctx.fillStyle = hookCol;
  ctx.beginPath();
  ctx.moveTo(-2, 10);
  ctx.lineTo(1, 7);
  ctx.lineTo(0, 10);
  ctx.closePath();
  ctx.fill();

  // Latch Flash Spark if pulling
  if (state === 'pulling' || state === 'smashing') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  ctx.restore();
}

/**
 * Vẽ đầu Thanh Long khổng lồ giáng thế (Long Ngẩng Đầu)
 */
export function drawQinglongHead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  alpha: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 25;

  // Dragon Mane / Hair (Lông bờm rồng xanh biếc)
  ctx.fillStyle = '#059669';
  ctx.beginPath();
  ctx.moveTo(-60, -40);
  ctx.quadraticCurveTo(-90, -70, -40, -60);
  ctx.quadraticCurveTo(-20, -100, 10, -65);
  ctx.quadraticCurveTo(50, -90, 45, -45);
  ctx.quadraticCurveTo(80, -30, 50, 0);
  ctx.quadraticCurveTo(-20, 20, -60, -40);
  ctx.fill();

  // Dragon Horns (Cặp sừng rồng ngọc)
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-25, -50);
  ctx.quadraticCurveTo(-50, -110, -70, -95);
  ctx.lineTo(-40, -60);
  ctx.moveTo(15, -50);
  ctx.quadraticCurveTo(35, -110, 60, -95);
  ctx.lineTo(25, -60);
  ctx.fill();
  ctx.stroke();

  // Dragon Snout & Head (Đầu Rồng Xanh Lục Bảo)
  const headGrad = ctx.createLinearGradient(-40, -40, 40, 40);
  headGrad.addColorStop(0, '#10b981');
  headGrad.addColorStop(0.6, '#047857');
  headGrad.addColorStop(1, '#064e3b');
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.moveTo(-45, -30);
  ctx.lineTo(45, -30);
  ctx.quadraticCurveTo(60, 10, 35, 45);
  ctx.lineTo(-35, 45);
  ctx.quadraticCurveTo(-60, 10, -45, -30);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Glowing Golden Dragon Eyes (Mắt Rồng Hoàng Kim)
  ctx.fillStyle = '#fde047';
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(-20, -5, 7, 0, Math.PI * 2);
  ctx.arc(20, -5, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(-20, -5, 3, 0, Math.PI * 2);
  ctx.arc(20, -5, 3, 0, Math.PI * 2);
  ctx.fill();

  // Whiskers (Râu rồng uốn lượn)
  const whiskerWave = Math.sin(now * 0.01) * 10;
  ctx.strokeStyle = '#a7f3d0';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-30, 25);
  ctx.bezierCurveTo(-70, 30, -90, 60 + whiskerWave, -110, 80);
  ctx.moveTo(30, 25);
  ctx.bezierCurveTo(70, 30, 90, 60 - whiskerWave, 110, 80);
  ctx.stroke();

  // Sharp Fangs (Răng nanh rồng)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-18, 42);
  ctx.lineTo(-14, 56);
  ctx.lineTo(-10, 42);
  ctx.moveTo(10, 42);
  ctx.lineTo(14, 56);
  ctx.lineTo(18, 42);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ luồng Thanh Long bơi ngang đập vào tường (Du Long Bái Vĩ)
 */
export function drawDragonWave(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  vx: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  const dir = vx >= 0 ? 1 : -1;
  ctx.scale(dir, 1);

  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 12;

  // Serpentine dragon body
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
  ctx.lineWidth = radius * 0.9;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-radius * 2, Math.sin(now * 0.02) * 6);
  ctx.quadraticCurveTo(-radius, Math.sin(now * 0.02 + 1) * -6, 0, 0);
  ctx.stroke();

  // Dragon Head
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Eye
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(radius * 0.3, -radius * 0.3, radius * 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ máy khoan lốc xoáy (Ngọa Long Phiên Đăng)
 */
export function drawDrillVortex(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  angle: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.shadowColor = '#34d399';
  ctx.shadowBlur = 15;

  // Spiral conical drill blade blades
  const bladeCount = 4;
  for (let i = 0; i < bladeCount; i++) {
    const a = (i * Math.PI * 2) / bladeCount;
    ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#059669';
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * (radius + 14), Math.sin(a) * (radius + 14));
    ctx.lineTo(Math.cos(a + 0.6) * (radius - 2), Math.sin(a + 0.6) * (radius - 2));
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
  }

  // Glowing center drill tip
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ mũi khoan năng lượng xanh lá bay thẳng (Ngọa Long Mũi Khoan)
 */
export function drawDrillProjectile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  vx: number,
  vy: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  const angle = Math.atan2(vy, vx);
  ctx.rotate(angle);

  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 14;

  // Drill cone
  const grad = ctx.createLinearGradient(-15, 0, 15, 0);
  grad.addColorStop(0, '#047857');
  grad.addColorStop(0.7, '#10b981');
  grad.addColorStop(1, '#a7f3d0');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(-12, -7);
  ctx.lineTo(-8, 0);
  ctx.lineTo(-12, 7);
  ctx.closePath();
  ctx.fill();

  // Spiral threads
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-4, -6);
  ctx.lineTo(4, 6);
  ctx.moveTo(4, -5);
  ctx.lineTo(12, 3);
  ctx.stroke();

  ctx.restore();
}

/**
 * Vẽ tuyệt kỹ Hán Thất Nghiêm Đông của Lưu Bị (2 Đại Cự Kiếm Hỏa & Băng)
 */
export function drawLuuBeiDualBladeSlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  type: 'fire' | 'ice' | 'finish',
  progress: number,
  angle: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const alpha = Math.max(0, 1 - progress);
  ctx.globalAlpha = alpha;

  if (type === 'fire') {
    // Great Flame Sword Slash (Hỏa Kiếm)
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 24;

    const swordLen = 90 + progress * 40;
    const fireGrad = ctx.createLinearGradient(0, -swordLen, 0, 0);
    fireGrad.addColorStop(0, '#ffedd5');
    fireGrad.addColorStop(0.3, '#f97316');
    fireGrad.addColorStop(0.8, '#dc2626');
    fireGrad.addColorStop(1, '#7f1d1d');

    ctx.fillStyle = fireGrad;
    ctx.beginPath();
    ctx.moveTo(0, -swordLen);
    ctx.lineTo(16, -20);
    ctx.lineTo(6, 0);
    ctx.lineTo(-6, 0);
    ctx.lineTo(-16, -20);
    ctx.closePath();
    ctx.fill();

    // Fiery Flame Trail Arc
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 6 * (1 - progress);
    ctx.beginPath();
    ctx.arc(0, 0, swordLen * 0.7, -Math.PI * 0.7, Math.PI * 0.2);
    ctx.stroke();
  } else if (type === 'ice') {
    // Great Frost Ice Sword Slash (Băng Kiếm)
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 24;

    const swordLen = 90 + progress * 40;
    const iceGrad = ctx.createLinearGradient(0, -swordLen, 0, 0);
    iceGrad.addColorStop(0, '#ffffff');
    iceGrad.addColorStop(0.3, '#38bdf8');
    iceGrad.addColorStop(0.8, '#0284c7');
    iceGrad.addColorStop(1, '#0c4a6e');

    ctx.fillStyle = iceGrad;
    ctx.beginPath();
    ctx.moveTo(0, -swordLen);
    ctx.lineTo(14, -25);
    ctx.lineTo(5, 0);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-14, -25);
    ctx.closePath();
    ctx.fill();

    // Ice Shard Crystals & Frost Arc
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 6 * (1 - progress);
    ctx.beginPath();
    ctx.arc(0, 0, swordLen * 0.7, -Math.PI * 0.2, Math.PI * 0.7);
    ctx.stroke();
  } else {
    // Grand Finish: Dual Flame & Ice Cross Eruption (Hỏa Băng Song Kiếm Hợp Bích)
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 30;

    const len = 110 + progress * 60;

    // Fire Blade (Left Cross)
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 10 * (1 - progress);
    ctx.beginPath();
    ctx.moveTo(-len * 0.7, -len * 0.7);
    ctx.lineTo(len * 0.7, len * 0.7);
    ctx.stroke();

    // Ice Blade (Right Cross)
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 10 * (1 - progress);
    ctx.beginPath();
    ctx.moveTo(len * 0.7, -len * 0.7);
    ctx.lineTo(-len * 0.7, len * 0.7);
    ctx.stroke();

    // Center Fusion Shockwave
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 25 * (1 - progress), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Hiệu ứng Vùng Biển Lửa & Phân thân phóng to thu nhỏ của Sở Tân Điếu
 */
export function drawSoTanDieuDomain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  now: number,
  durationProgress: number
) {
  ctx.save();
  // 1. Blazing Hellfire Domain Filter
  const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.75);
  grad.addColorStop(0, 'rgba(239, 68, 68, 0.18)');
  grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.25)');
  grad.addColorStop(1, 'rgba(185, 28, 28, 0.45)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Animated Flame Pillars & Floor Embers
  const numEmbers = 16;
  for (let i = 0; i < numEmbers; i++) {
    const angle = (i / numEmbers) * Math.PI * 2 + now * 0.0015;
    const dist = 140 + Math.sin(now * 0.003 + i) * 60;
    const ex = width / 2 + Math.cos(angle) * dist;
    const ey = height / 2 + Math.sin(angle) * dist;
    const scale = 1 + Math.sin(now * 0.006 + i * 2) * 0.5;

    ctx.save();
    ctx.translate(ex, ey);
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 18;
    ctx.fillStyle = i % 2 === 0 ? '#ef4444' : '#f59e0b';
    ctx.beginPath();
    ctx.arc(0, 0, 7 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 3. Blazing Ground Runes
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(now * 0.001);
  ctx.strokeStyle = 'rgba(251, 146, 60, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 160, 0, Math.PI * 2);
  ctx.stroke();

  // Hexagram Runes
  for (let j = 0; j < 6; j++) {
    const a1 = (j / 6) * Math.PI * 2;
    const a2 = ((j + 2) / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a1) * 160, Math.sin(a1) * 160);
    ctx.lineTo(Math.cos(a2) * 160, Math.sin(a2) * 160);
    ctx.stroke();
  }
  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ các phân thân của Sở Tân phóng to thu nhỏ bao vây trong 7.5s
 */
export function drawSoTanDieuClones(
  ctx: CanvasRenderingContext2D,
  targetX: number,
  targetY: number,
  now: number
) {
  ctx.save();
  const cloneCount = 8;
  for (let i = 0; i < cloneCount; i++) {
    const baseAngle = (i / cloneCount) * Math.PI * 2;
    const waveOffset = i * (Math.PI / 4);
    // Phóng to thu nhỏ liên tục (scale từ 0.4 đến 2.0)
    const scale = 1.1 + Math.sin(now * 0.008 + waveOffset) * 0.7;
    const orbitDist = 95 + Math.cos(now * 0.005 + waveOffset) * 45;

    const cx = targetX + Math.cos(baseAngle + now * 0.002) * orbitDist;
    const cy = targetY + Math.sin(baseAngle + now * 0.002) * orbitDist;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.globalAlpha = 0.65 + Math.sin(now * 0.01 + waveOffset) * 0.25;

    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 16;

    // Cyan/Teal Phantom Clone Ball
    ctx.fillStyle = '#0891b2';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#67e8f9';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Phantom Rod held by clone
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(24, -20);
    ctx.stroke();

    ctx.restore();
  }
  ctx.restore();
}

/**
 * Đường chém cực to siêu hoành tráng của 50 nhát Sở Tân Điếu
 */
export function drawMegaSlashLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  width: number,
  color: string,
  createdAt: number,
  now: number,
  duration = 260
) {
  const elapsed = now - createdAt;
  if (elapsed < 0 || elapsed > duration) return;
  const progress = elapsed / duration;
  const alpha = Math.max(0, 1 - progress);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  ctx.shadowColor = color;
  ctx.shadowBlur = 28;

  // Outer glow blade
  const grad = ctx.createLinearGradient(-length / 2, 0, length / 2, 0);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  grad.addColorStop(0.15, color);
  grad.addColorStop(0.5, '#ffffff');
  grad.addColorStop(0.85, color);
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, length / 2, width / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Core white incandescent slash line
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, 0, length * 0.45, width * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Spark burst particles along the cut line
  for (let i = -2; i <= 2; i++) {
    const px = (i / 2) * (length * 0.35);
    const py = (Math.random() - 0.5) * width;
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Hiệu ứng Cầu Lửa Long Hồn Đoạn Hải (Tồn tại 5s, đốt máu liên tục 5 DMG/0.2s)
 */
export function drawLongHonFireOrb(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  createdAt: number,
  expiresAt: number,
  now: number
) {
  const totalDuration = expiresAt - createdAt;
  const elapsed = now - createdAt;
  if (elapsed < 0 || elapsed > totalDuration) return;

  const timeLeftRatio = Math.max(0, (expiresAt - now) / totalDuration);
  const pulse = Math.sin(now * 0.015) * 4;
  const currentRadius = radius + pulse;

  ctx.save();
  ctx.translate(x, y);

  // 1. Outer Inferno Radial Glow & Heat Distortion Field
  const outerGrad = ctx.createRadialGradient(0, 0, currentRadius * 0.2, 0, 0, currentRadius * 1.5);
  outerGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
  outerGrad.addColorStop(0.3, 'rgba(249, 115, 22, 0.7)');
  outerGrad.addColorStop(0.65, 'rgba(220, 38, 38, 0.4)');
  outerGrad.addColorStop(1, 'rgba(127, 29, 29, 0)');

  ctx.fillStyle = outerGrad;
  ctx.beginPath();
  ctx.arc(0, 0, currentRadius * 1.5, 0, Math.PI * 2);
  ctx.fill();

  // 2. Swirling Solar Flares / Fire Tendrils around Orb
  const numTendrils = 8;
  for (let i = 0; i < numTendrils; i++) {
    const angle = (i / numTendrils) * Math.PI * 2 + (now * 0.003 * (i % 2 === 0 ? 1 : -1));
    const flareLen = currentRadius * (1.1 + Math.sin(now * 0.01 + i) * 0.25);
    const fx = Math.cos(angle) * flareLen;
    const fy = Math.sin(angle) * flareLen;

    ctx.strokeStyle = i % 2 === 0 ? 'rgba(251, 146, 60, 0.75)' : 'rgba(239, 68, 68, 0.65)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * (currentRadius * 0.4), Math.sin(angle) * (currentRadius * 0.4));
    ctx.quadraticCurveTo(
      Math.cos(angle + 0.4) * (flareLen * 0.8),
      Math.sin(angle + 0.4) * (flareLen * 0.8),
      fx,
      fy
    );
    ctx.stroke();
  }

  // 3. Dense Magma Core Sphere
  ctx.shadowColor = '#ea580c';
  ctx.shadowBlur = 24;

  const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, currentRadius * 0.75);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.2, '#fef08a');
  coreGrad.addColorStop(0.5, '#f97316');
  coreGrad.addColorStop(0.85, '#dc2626');
  coreGrad.addColorStop(1, '#7f1d1d');

  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(0, 0, currentRadius * 0.75, 0, Math.PI * 2);
  ctx.fill();

  // 4. White Incandescent Heart
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, currentRadius * 0.28, 0, Math.PI * 2);
  ctx.fill();

  // 5. 5s Countdown Progress Ring (Vòng đếm thời gian 5s xung quanh)
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
  ctx.lineWidth = 3;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, currentRadius * 1.15, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * timeLeftRatio);
  ctx.stroke();
  ctx.setLineDash([]);

  // Floating status text
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fef08a';
  ctx.fillText(`🔥 CẦU LỬA: ${(Math.max(0, (expiresAt - now) / 1000)).toFixed(1)}s (5 DMG/0.2s)`, 0, -currentRadius * 1.3);

  ctx.restore();
}

/**
 * Hiệu ứng Cột Lửa Long Hồn Đoạn Hải (Bùng nổ sau 5s, đốt cực nhanh 2.5 DMG/0.035s)
 */
export function drawLongHonFirePillar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  createdAt: number,
  expiresAt: number,
  now: number
) {
  const totalDuration = expiresAt - createdAt;
  const elapsed = now - createdAt;
  if (elapsed < 0 || elapsed > totalDuration) return;

  const progress = elapsed / totalDuration;
  const alpha = Math.max(0, 1 - progress * 0.4);

  ctx.save();
  ctx.globalAlpha = alpha;

  const pulse = Math.sin(now * 0.04) * 6;
  const pillarWidth = (radius * 1.6 + pulse) * (progress < 0.1 ? progress / 0.1 : (1 - progress * 0.2));

  // 1. Towering Ground-to-Sky Blazing Column
  const pillarGrad = ctx.createLinearGradient(x - pillarWidth / 2, 0, x + pillarWidth / 2, 0);
  pillarGrad.addColorStop(0, 'rgba(185, 28, 28, 0)');
  pillarGrad.addColorStop(0.2, 'rgba(239, 68, 68, 0.7)');
  pillarGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.95)');
  pillarGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.7)');
  pillarGrad.addColorStop(1, 'rgba(185, 28, 28, 0)');

  ctx.fillStyle = pillarGrad;
  ctx.fillRect(x - pillarWidth / 2, 0, pillarWidth, 600);

  // 2. White-Hot Incandescent Core Beam
  const coreWidth = pillarWidth * 0.35;
  const coreGrad = ctx.createLinearGradient(x - coreWidth / 2, 0, x + coreWidth / 2, 0);
  coreGrad.addColorStop(0, 'rgba(254, 240, 138, 0.3)');
  coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  coreGrad.addColorStop(1, 'rgba(254, 240, 138, 0.3)');

  ctx.fillStyle = coreGrad;
  ctx.fillRect(x - coreWidth / 2, 0, coreWidth, 600);

  // 3. Ground Caldera Shockwave Base (Chân cột lửa bùng nổ)
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1, 0.45);
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 30;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.5 + Math.sin(now * 0.03) * 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 4. Helical Rising Plasma Vortex Arcs
  const numHelices = 6;
  for (let i = 0; i < numHelices; i++) {
    const helixOffset = (i / numHelices) * Math.PI * 2;
    ctx.strokeStyle = i % 2 === 0 ? '#fef08a' : '#f97316';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let py = 0; py <= 600; py += 30) {
      const hAngle = (py * 0.02) + (now * 0.01) + helixOffset;
      const hx = x + Math.sin(hAngle) * (pillarWidth * 0.45);
      if (py === 0) ctx.moveTo(hx, py);
      else ctx.lineTo(hx, py);
    }
    ctx.stroke();
  }

  // Floating Status Label
  ctx.font = 'bold 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fef08a';
  ctx.fillText(`🌋 CỘT LỬA LONG HỒN (2.5 DMG/0.035s)`, x, y - radius - 18);

  ctx.restore();
}

/**
 * Vẽ Hắc Long cuồn cuộn bay theo Bá Thường trong kỹ năng Long Hồn Đoạn Hải
 */
export function drawHacLongFollower(
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  trailPoints: { x: number; y: number }[],
  now: number
) {
  ctx.save();

  // Draw Dragon Body along the trail
  if (trailPoints.length > 2) {
    ctx.shadowColor = '#0f172a';
    ctx.shadowBlur = 24;

    for (let i = trailPoints.length - 1; i >= 0; i--) {
      const pt = trailPoints[i];
      const prog = i / trailPoints.length; // 1 at head, 0 at tail
      const segRadius = 14 + prog * 18;

      // Dark Obsidian & Void Purple Gradient for Hắc Long
      const segGrad = ctx.createRadialGradient(pt.x, pt.y, 2, pt.x, pt.y, segRadius);
      segGrad.addColorStop(0, '#334155');
      segGrad.addColorStop(0.4, '#0f172a');
      segGrad.addColorStop(0.8, '#020617');
      segGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = segGrad;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, segRadius, 0, Math.PI * 2);
      ctx.fill();

      // Dragon Scale Sparks & Glowing Spine Spikes
      if (i % 2 === 0) {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y - segRadius * 0.6, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Draw Majestic Hắc Long Head near the Ball
  ctx.save();
  ctx.translate(ballX, ballY - 20);

  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 30;

  // Hắc Long Horns (Sừng Hắc Long màu đen tuyền viền lam)
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-15, -15);
  ctx.quadraticCurveTo(-35, -45, -50, -38);
  ctx.moveTo(15, -15);
  ctx.quadraticCurveTo(35, -45, 50, -38);
  ctx.stroke();

  // Head Silhouette
  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Blazing Blue / Gold Eyes (Mắt Hắc Long Rực Sáng)
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(-9, -4, 4.5, 2.5, -0.2, 0, Math.PI * 2);
  ctx.ellipse(9, -4, 4.5, 2.5, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-9, -4, 1.5, 0, Math.PI * 2);
  ctx.arc(9, -4, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Dragon Whiskers (Râu Rồng Hắc Long)
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-15, 6);
  ctx.quadraticCurveTo(-40, 20 + Math.sin(now * 0.01) * 8, -60, 10);
  ctx.moveTo(15, 6);
  ctx.quadraticCurveTo(40, 20 + Math.sin(now * 0.01) * 8, 60, 10);
  ctx.stroke();

  ctx.restore();

  ctx.restore();
}

/**
 * Hiệu ứng Cutscene Bôi Máu Lên Cần Câu của Bá Thường
 */
export function drawLongHonDoanHaiCutscene(
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  now: number,
  startTime: number
) {
  const elapsed = now - startTime;
  ctx.save();
  ctx.translate(ballX, ballY);

  // Cinematic Letterbox & Dark Vignette
  ctx.shadowColor = '#0284c7';
  ctx.shadowBlur = 35;

  // Blue Aura Field
  const pulse = Math.sin(now * 0.01) * 6;
  const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 80 + pulse);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  grad.addColorStop(0.6, 'rgba(14, 116, 144, 0.25)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 80 + pulse, 0, Math.PI * 2);
  ctx.fill();

  // Glowing Dragon Hand Smearing Dragon Blood on Fishing Rod
  // Rod
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-45, 45);
  ctx.lineTo(45, -45);
  ctx.stroke();

  // Blood smear animation traveling up the rod
  const smearProg = Math.min(1, elapsed / 1200);
  const bloodX = -45 + 90 * smearProg;
  const bloodY = 45 - 90 * smearProg;

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-45, 45);
  ctx.lineTo(bloodX, bloodY);
  ctx.stroke();

  // Dragon Hand & Blood Droplets
  ctx.fillStyle = '#0d9488';
  ctx.beginPath();
  ctx.arc(bloodX, bloodY, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(bloodX + 4, bloodY - 4, 5, 0, Math.PI * 2);
  ctx.fill();

  // Reel & Spool Glow (Trục máy câu phóng to rực lửa lam)
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(-20, 20, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(-20, 20, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Hiệu ứng hiển thị Dummy Sandbox & Bộ đếm Tổng Sát Thương
 */
export function drawSandboxDummyInfo(
  ctx: CanvasRenderingContext2D,
  dummyX: number,
  dummyY: number,
  dummyRadius: number,
  totalDmg: number,
  dps: number,
  now: number
) {
  ctx.save();

  // 1. Glowing Target Platform beneath Dummy
  ctx.save();
  ctx.translate(dummyX, dummyY + dummyRadius + 6);
  ctx.scale(1, 0.4);
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 0, dummyRadius * 1.6 + Math.sin(now * 0.005) * 3, 0, Math.PI * 2);
  ctx.stroke();

  // Target Crosshairs
  ctx.beginPath();
  ctx.moveTo(-dummyRadius * 1.8, 0);
  ctx.lineTo(dummyRadius * 1.8, 0);
  ctx.moveTo(0, -dummyRadius * 1.8);
  ctx.lineTo(0, dummyRadius * 1.8);
  ctx.stroke();
  ctx.restore();

  // 2. Infinity HP Shield / Hologram Badge over Dummy
  ctx.save();
  ctx.translate(dummyX, dummyY);
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 18;

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('∞ HP', 0, -2);
  ctx.restore();

  // 3. Floating Damage Board above Dummy
  const boardY = dummyY - dummyRadius - 42;
  const boardWidth = 190;
  const boardHeight = 54;

  ctx.save();
  ctx.translate(dummyX, boardY);

  // Background card
  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(-boardWidth / 2, -boardHeight / 2, boardWidth, boardHeight, 10);
  ctx.fill();
  ctx.stroke();

  // Total DMG text
  ctx.font = 'bold 14px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f87171';
  ctx.fillText(`TỔNG SÁT THƯƠNG: ${totalDmg.toLocaleString()}`, 0, -8);

  // DPS & Reset instruction
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`DPS: ${dps.toLocaleString()}/s  •  [Click để Reset]`, 0, 12);

  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ ngoại hình & 3 thanh Katana của Zoro (Tam Kiếm - Santoryu) trên quả bóng
 */
export function drawTamKiemZoroAvatar(
  ctx: CanvasRenderingContext2D,
  ballX: number,
  ballY: number,
  radius: number,
  isPlayer: boolean,
  recoil: number,
  now: number
) {
  ctx.save();
  ctx.translate(ballX, ballY);

  // 1. Asura Demon Aura (Khí tức Quỷ Thần Asura 9 kiếm)
  const auraPulse = Math.sin(now * 0.012) * 2.5;
  const auraRad = radius + 8 + auraPulse;
  const grad = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, auraRad);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.25)'); // Emerald Green
  grad.addColorStop(0.5, 'rgba(147, 51, 234, 0.35)'); // Haoshoku Haki Purple
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, auraRad, 0, Math.PI * 2);
  ctx.fill();

  // 2. Zoro Pirate Dark Green Bandana (Khăn rằn hải tặc quấn đầu)
  ctx.fillStyle = '#14532d'; // Dark forest green
  ctx.beginPath();
  ctx.arc(0, -radius * 0.2, radius * 0.95, Math.PI * 1.05, Math.PI * 1.95, false);
  ctx.lineTo(radius * 0.85, -radius * 0.2);
  ctx.lineTo(-radius * 0.85, -radius * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#22c55e'; // Green highlight
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Bandana side knot
  const knotX = isPlayer ? -radius * 0.85 : radius * 0.85;
  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.arc(knotX, -radius * 0.35, 4, 0, Math.PI * 2);
  ctx.fill();
  // Bandana cloth tails
  ctx.beginPath();
  ctx.moveTo(knotX, -radius * 0.35);
  ctx.quadraticCurveTo(knotX + (isPlayer ? -8 : 8), -radius * 0.1, knotX + (isPlayer ? -12 : 12), radius * 0.2);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#14532d';
  ctx.stroke();

  // 3. Zoro Left Eye Scar (Vết sẹo dọc mắt trái)
  const eyeL_X = -5;
  const eyeR_X = 5;
  const eyeY = 0;

  // Left Eye Scar line
  ctx.strokeStyle = '#7f1d1d'; // Blood crimson
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(eyeL_X, eyeY - 7);
  ctx.lineTo(eyeL_X, eyeY + 7);
  ctx.stroke();

  // Left Eye (Closed with scar)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(eyeL_X - 3, eyeY);
  ctx.lineTo(eyeL_X + 3, eyeY);
  ctx.stroke();

  // Right Eye (Gleaming demonic red / fierce focus)
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(eyeR_X, eyeY, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(eyeR_X + (isPlayer ? 0.8 : -0.8), eyeY - 0.8, 1, 0, Math.PI * 2);
  ctx.fill();

  // 4. MOUTH KATANA: Wado Ichimonji (Hòa Đạo Nhất Văn Tự)
  // Ngậm ngang miệng, chuôi trắng tinh khôi, lưỡi vươn dài
  const mouthY = radius * 0.45;
  const mouthDir = isPlayer ? 1 : -1;
  ctx.save();
  // White hilt held in mouth
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-6, mouthY - 2.5, 12, 5);
  ctx.strokeStyle = '#f59e0b'; // Gold guard
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-6, mouthY - 2.5, 12, 5);

  // Pure white/silver Katana blade pointing forward
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.moveTo(mouthDir * 6, mouthY - 2);
  ctx.lineTo(mouthDir * (6 + 28), mouthY - 1.2);
  ctx.lineTo(mouthDir * (6 + 32), mouthY); // sharp tip
  ctx.lineTo(mouthDir * (6 + 28), mouthY + 1.2);
  ctx.lineTo(mouthDir * 6, mouthY + 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#38bdf8'; // Blue razor glow
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();

  // 5. LEFT HAND KATANA: Sandai Kitetsu (Tam Thế Quỷ Triệt - Vỏ đỏ đen quỷ kiếm)
  const recoilL = recoil > 0.5 ? -8 : 0;
  ctx.save();
  ctx.translate(-radius * 0.9, -radius * 0.2 + recoilL);
  ctx.rotate((-35 * Math.PI) / 180 + Math.sin(now * 0.01) * 0.1);
  // Red & black hilt
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(-3, 0, 6, 14);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-4, -2, 8, 3);
  // Silver blade with crimson flame aura
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-2, -30, 4, 28);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-2, -30, 4, 28);
  ctx.restore();

  // 6. RIGHT HAND KATANA: Enma (Diêm Ma - Tím đen Haki Bá Vương)
  const recoilR = recoil > 0 && recoil <= 0.5 ? -8 : 0;
  ctx.save();
  ctx.translate(radius * 0.9, -radius * 0.2 + recoilR);
  ctx.rotate((35 * Math.PI) / 180 - Math.sin(now * 0.01) * 0.1);
  // Purple & gold hilt
  ctx.fillStyle = '#6b21a8';
  ctx.fillRect(-3, 0, 6, 14);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(-4, -2, 8, 3);
  // Silver blade with purple flame aura
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-2, -30, 4, 28);
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-2, -30, 4, 28);
  ctx.restore();

  ctx.restore();
}

/**
 * Hiệu ứng Tuyệt Kỹ Tam Thiên Thế Giới (Santoryu: Sanzen Sekai)
 * Cơn lốc xoáy 3 lưỡi kiếm xé toạc không gian
 */
export function drawSanzenSekaiVortex(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const rotSpeed = now * 0.035; // Fast whirling blades
  const swordColors = ['#38bdf8', '#ef4444', '#c084fc']; // Wado, Kitetsu, Enma

  // 3 spinning blade arcs
  for (let i = 0; i < 3; i++) {
    const angle = rotSpeed + (i * Math.PI * 2) / 3;
    ctx.save();
    ctx.rotate(angle);

    // Whirling blade trail
    const grad = ctx.createLinearGradient(0, 0, radius * 2.2, 0);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.5, swordColors[i]);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.6, 0, Math.PI * 0.65);
    ctx.stroke();

    // Katana silhouette in vortex
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(radius * 0.4, -2, radius * 1.2, 4);
    ctx.strokeStyle = swordColors[i];
    ctx.lineWidth = 2;
    ctx.strokeRect(radius * 0.4, -2, radius * 1.2, 4);
    ctx.restore();
  }

  // Center Spatial Shockwave
  const pulse = Math.sin(now * 0.02) * 6;
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.2 + pulse, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Hiệu ứng Đại Lốc Xoáy Rồng Ba Kiếm (Kokujo: O Tatsumaki)
 */
export function drawTatsumakiDragon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const rot = now * 0.02;
  const layers = 5;

  for (let i = 0; i < layers; i++) {
    const layerRad = radius * (0.4 + (i / layers) * 0.9);
    const layerAngle = rot + (i * Math.PI) / 3;

    ctx.save();
    ctx.rotate(layerAngle);
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(147, 51, 234, 0.7)';
    ctx.lineWidth = 3 + i * 1.2;
    ctx.beginPath();
    ctx.arc(0, 0, layerRad, 0, Math.PI * 1.4);
    ctx.stroke();

    // Dragon Wind Claws
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(layerRad, 0, 3 + i, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Dragon Eye Glowing in center
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Vẽ Tam Kiếm Khí (3 luồng kiếm khí phóng đi cùng lúc)
 */
export function drawTamKiemSlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const colors = ['#38bdf8', '#ef4444', '#c084fc'];
  const offsets = [-7, 0, 7];

  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.translate(0, offsets[i]);

    // Outer aura
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-radius * 0.8, 0, radius, -Math.PI * 0.35, Math.PI * 0.35);
    ctx.stroke();

    // Core sharp blade light
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(-radius * 0.8, 0, radius, -Math.PI * 0.3, Math.PI * 0.3);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

// ----------------------------------------------------
// PHI THIÊN VÔ CỰC ĐIẾU - TỐI CAO ÁO NGHĨA
// ----------------------------------------------------
export function drawPhiThienVoCucTornado(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  ringsRot: number[],
  tornadoAngle: number,
  now: number
) {
  ctx.save();
  ctx.translate(centerX, centerY);

  const rainbowColors = [
    '#ef4444', '#f97316', '#facc15', '#22c55e', '#06b6d4',
    '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'
  ];

  // 1. Heavenly Light Pillar (Cột sáng thiên giới từ trời giáng xuống tâm)
  const pillarGrad = ctx.createLinearGradient(0, -250, 0, 80);
  pillarGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  pillarGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.25)');
  pillarGrad.addColorStop(0.7, 'rgba(236, 72, 153, 0.3)');
  pillarGrad.addColorStop(1, 'rgba(250, 204, 21, 0.45)');
  ctx.fillStyle = pillarGrad;
  ctx.fillRect(-35, -250, 70, 330);

  // Expanding shockwave ripples
  for (let s = 0; s < 3; s++) {
    const sPhase = ((now * 0.002 + s * 0.33) % 1);
    const sRadius = sPhase * 240;
    const sAlpha = (1 - sPhase) * 0.6;
    ctx.strokeStyle = `rgba(244, 63, 94, ${sAlpha})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, sRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Van Luan 9-Tier Rainbow Rings
  const radii = [28, 46, 64, 84, 106, 130, 156, 184, 216];
  for (let i = 0; i < 9; i++) {
    const r = radii[i];
    const rot = ringsRot[i] || (now * (0.001 + i * 0.0003) * (i % 2 === 0 ? 1 : -1));
    const col = rainbowColors[i % rainbowColors.length];

    ctx.save();
    ctx.rotate(rot);
    ctx.strokeStyle = col;
    ctx.shadowColor = col;
    ctx.shadowBlur = 15;
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    // Sacred Runes & Magic Nodes
    const runesCount = 4 + i * 2;
    for (let k = 0; k < runesCount; k++) {
      const a = (k * Math.PI * 2) / runesCount;
      const rx = Math.cos(a) * r;
      const ry = Math.sin(a) * r;
      ctx.fillStyle = k % 2 === 0 ? '#ffffff' : col;
      ctx.beginPath();
      ctx.arc(rx, ry, k % 2 === 0 ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 3. Swirling Rainbow Tornado Whirlwind (Bão Lốc Xoáy Cầu Vồng hút chân không)
  ctx.save();
  ctx.rotate(tornadoAngle);
  const arms = 8;
  for (let arm = 0; arm < arms; arm++) {
    const baseA = (arm * Math.PI * 2) / arms;
    const col = rainbowColors[arm % rainbowColors.length];
    ctx.strokeStyle = col;
    ctx.lineWidth = 5;
    ctx.shadowColor = col;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    for (let dist = 8; dist < 240; dist += 10) {
      const spiralAngle = baseA + (dist * 0.038);
      const px = Math.cos(spiralAngle) * dist;
      const py = Math.sin(spiralAngle) * dist;
      if (dist === 8) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  ctx.restore();

  // Swirling Inward Vacuum Particles
  for (let p = 0; p < 16; p++) {
    const pPhase = ((now * 0.0025 + p * 0.0625) % 1);
    const pDist = (1 - pPhase) * 230 + 10;
    const pAngle = p * 1.618 * Math.PI * 2 + now * 0.004;
    const px = Math.cos(pAngle) * pDist;
    const py = Math.sin(pAngle) * pDist;
    ctx.fillStyle = rainbowColors[p % rainbowColors.length];
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(px, py, 3.5 * pPhase + 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Four Sacred Beasts Spirit Manifestations at 4 Quadrants
  const beastRadius = 150;
  const beasts = [
    { icon: '🐉', name: 'THANH LONG', a: 0, color: '#10b981', ringCol: '#34d399' },
    { icon: '🐅', name: 'BẠCH HỔ', a: Math.PI * 0.5, color: '#f8fafc', ringCol: '#cbd5e1' },
    { icon: '🦅', name: 'CHU TƯỚC', a: Math.PI, color: '#ef4444', ringCol: '#f87171' },
    { icon: '🐢', name: 'HUYỀN VŨ', a: Math.PI * 1.5, color: '#06b6d4', ringCol: '#38bdf8' }
  ];
  for (const b of beasts) {
    const curA = b.a + now * 0.0018;
    const bx = Math.cos(curA) * beastRadius;
    const by = Math.sin(curA) * beastRadius;

    // Glowing aura disc behind beast
    ctx.save();
    ctx.fillStyle = b.ringCol + '33';
    ctx.strokeStyle = b.color;
    ctx.lineWidth = 2;
    ctx.shadowColor = b.color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(bx, by, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(b.icon, bx, by);
    ctx.restore();
  }

  // 5. Center Radiant Prismatic Star Core
  ctx.save();
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 35;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();

  // Inner pulsing core
  const pulse = Math.sin(now * 0.01) * 4;
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 24 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 6. Majestic Skill Title Banner on Top
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#ec4899';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.roundRect(-140, -195, 280, 28, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#facc15';
  ctx.fillText('⚡ VẠN LUÂN QUY TÔNG • PHI THIÊN VÔ CỰC ĐIẾU ⚡', 0, -181);
  ctx.restore();

  ctx.restore();
}

// ----------------------------------------------------
// TOÁN THIÊN THẤU CHI ĐIẾU (MŨI KHOAN GĂM TƯỜNG)
// ----------------------------------------------------
export function drawToanThienDrill(
  ctx: CanvasRenderingContext2D,
  drillX: number,
  drillY: number,
  angle: number,
  rotAngle: number,
  isWallPinned: boolean,
  now: number
) {
  ctx.save();
  ctx.translate(drillX, drillY);
  ctx.rotate(angle);

  // 1. Wall Pin Friction & Cracks if pinned against border
  if (isWallPinned) {
    ctx.save();
    // Wall Shatter Cracks
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 16;
    for (let c = 0; c < 8; c++) {
      const crackAngle = (c * Math.PI * 2) / 8 + Math.sin(c * 1.5) * 0.3;
      const len = 35 + (c % 3) * 15;
      ctx.beginPath();
      ctx.moveTo(35, 0);
      ctx.lineTo(35 + Math.cos(crackAngle) * len, Math.sin(crackAngle) * len);
      ctx.stroke();
    }

    // Heavy Friction Sparks Shower
    const sparkCount = 18;
    for (let sp = 0; sp < sparkCount; sp++) {
      const spA = Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 0.9;
      const spDist = 15 + Math.random() * 45;
      const spX = 35 + Math.cos(spA) * spDist;
      const spY = Math.sin(spA) * spDist;
      ctx.fillStyle = sp % 2 === 0 ? '#facc15' : '#ef4444';
      ctx.beginPath();
      ctx.arc(spX, spY, 2 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Divine Energy Chains binding victim to wall
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(35, -35);
    ctx.lineTo(10, 0);
    ctx.lineTo(35, 35);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  // 2. Thruster Jet Cone & Vortex Behind Drill
  ctx.save();
  const jetGrad = ctx.createLinearGradient(-65, 0, -25, 0);
  jetGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
  jetGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.55)');
  jetGrad.addColorStop(1, 'rgba(56, 189, 248, 0.85)');
  ctx.fillStyle = jetGrad;
  ctx.beginPath();
  ctx.moveTo(-65, -12);
  ctx.lineTo(-20, 0);
  ctx.lineTo(-65, 12);
  ctx.closePath();
  ctx.fill();

  // Spiral Vortex Rings behind
  for (let r = 0; r < 3; r++) {
    const rx = -30 - r * 14;
    const ry = 10 + r * 3;
    ctx.strokeStyle = r % 2 === 0 ? '#38bdf8' : '#facc15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(rx, 0, 4, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Spiral Drill Cone Body (6 Helical Flutes)
  ctx.save();
  ctx.shadowColor = isWallPinned ? '#ef4444' : '#f59e0b';
  ctx.shadowBlur = 24;

  const numFlutes = 6;
  for (let i = 0; i < numFlutes; i++) {
    const phase = rotAngle + (i * Math.PI * 2) / numFlutes;
    const wave = Math.sin(phase) * 14;
    const waveNext = Math.sin(phase + Math.PI / 3) * 14;

    const grad = ctx.createLinearGradient(-45, wave - 10, 40, 0);
    if (i % 2 === 0) {
      grad.addColorStop(0, '#0284c7');
      grad.addColorStop(0.5, '#38bdf8');
      grad.addColorStop(1, '#e0f2fe');
    } else {
      grad.addColorStop(0, '#b45309');
      grad.addColorStop(0.5, '#f59e0b');
      grad.addColorStop(1, '#fef08a');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(42, 0); // Drill Tip
    ctx.lineTo(-45, wave - 10);
    ctx.lineTo(-45, waveNext + 10);
    ctx.closePath();
    ctx.fill();
  }

  // 4. Diamond Tip with Ultra Prismatic Core
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.moveTo(48, 0);
  ctx.lineTo(28, -7);
  ctx.lineTo(28, 7);
  ctx.closePath();
  ctx.fill();

  // Electric arc lightning on drill
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(40, 0);
  ctx.lineTo(15, (Math.sin(now * 0.03) * 12));
  ctx.lineTo(-15, (Math.cos(now * 0.03) * 12));
  ctx.stroke();
  ctx.restore();

  // 5. Status Banner when pinned or homing
  ctx.save();
  if (isWallPinned) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(-100, -38, 200, 22, 6);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = '#fef08a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡ [GĂM TƯỜNG MA SÁT 40 DMG/TICK] ⚡', 0, -27);
  } else {
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('🔩 [MŨI KHOAN BÁM ĐUỔI]', 0, -22);
  }
  ctx.restore();

  ctx.restore();
}

// ----------------------------------------------------
// THE OWNER GAME - VẠN VŨ KHÍ QUY TÔNG (OMNI-WEAPON CONVERGENCE)
// ----------------------------------------------------
export function drawTheOwnerOrbitingWeapons(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  rotAngle: number,
  now: number,
  is7b?: boolean
) {
  ctx.save();
  ctx.translate(centerX, centerY);

  if (is7b) {
    // Hyper Cosmic 7B% God Aura & Cyber Hex Shield
    const pulse = Math.sin(now * 0.008) * 8;
    const fastRot = now * 0.003;

    // 1. Cybernetic Rotating Hexagonal Energy Shield
    ctx.save();
    ctx.rotate(fastRot);
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.65)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    const hexR = 68 + pulse * 0.5;
    for (let k = 0; k < 6; k++) {
      const ha = (k * Math.PI) / 3;
      const hx = Math.cos(ha) * hexR;
      const hy = Math.sin(ha) * hexR;
      if (k === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();

    // Hex inner matrix grid nodes
    for (let k = 0; k < 6; k++) {
      const ha = (k * Math.PI) / 3;
      const hx = Math.cos(ha) * hexR;
      const hy = Math.sin(ha) * hexR;
      ctx.fillStyle = '#fde047';
      ctx.fillRect(hx - 2.5, hy - 2.5, 5, 5);
    }
    ctx.restore();

    // 2. Holographic Binary Code Ring Orbit
    ctx.save();
    ctx.rotate(-fastRot * 0.7);
    ctx.font = 'bold 8px monospace';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
    const binaryBits = ['0x7B', '101', 'ROOT', '7B%', '010', 'GOD', '111', 'MAX'];
    for (let b = 0; b < binaryBits.length; b++) {
      const ba = (b * Math.PI * 2) / binaryBits.length;
      const bx = Math.cos(ba) * 82;
      const by = Math.sin(ba) * 82;
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(ba + Math.PI / 2);
      ctx.fillText(binaryBits[b], 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // 3. Multi-layer Radiant Rings
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(0, 0, 95 + pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 125 - pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(0, 0, 150 + pulse * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // Matrix Hacker Circuit Halo
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 85, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 110, 0, Math.PI * 2);
    ctx.stroke();
  }

  // All Weapons Orbiting (including Daynit & Stellar Remote)
  const weapons: WeaponKey[] = [
    'kiem', 'dao', 'cung', 'no', 'giao', 'mace',
    'railgun', 'minigun', 'sangthe', 'cancau', 'songkiem',
    'tamkiem', 'torch', 'computer', 'daynit', 'stellar_remote'
  ];

  const total = weapons.length;
  for (let i = 0; i < total; i++) {
    const a = (rotAngle * (is7b ? 1.6 : 1.0)) + (i * Math.PI * 2) / total;
    const r = (is7b ? 110 : 95) + Math.sin(now * 0.006 + i) * (is7b ? 16 : 12);
    const wx = Math.cos(a) * r;
    const wy = Math.sin(a) * r;

    // Laser conduit tether to core if 7B
    if (is7b) {
      ctx.save();
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(250, 204, 21, 0.45)' : 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(wx, wy);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(wx, wy);
    ctx.rotate(a + Math.PI / 2);
    drawWeaponIcon(ctx, weapons[i], 0, 0, is7b ? 32 : 26);
    ctx.restore();

    // Laser sight pointing outwards
    if (i % 2 === 0) {
      ctx.strokeStyle = is7b ? 'rgba(251, 191, 36, 0.85)' : 'rgba(74, 222, 128, 0.4)';
      ctx.lineWidth = is7b ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx * (is7b ? 3.2 : 2.2), wy * (is7b ? 3.2 : 2.2));
      ctx.stroke();
    }
  }

  // Center Hologram
  ctx.save();
  ctx.font = is7b ? 'bold 11px monospace' : 'bold 9px monospace';
  ctx.fillStyle = is7b ? '#fde047' : '#86efac';
  ctx.shadowColor = is7b ? '#ca8a04' : '#22c55e';
  ctx.shadowBlur = 12;
  ctx.textAlign = 'center';

  if (is7b) {
    // Cyber Tag Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-65, -38, 130, 20);
    ctx.fillRect(-65, -38, 130, 20);

    ctx.fillStyle = '#fef08a';
    ctx.fillText('👑 7 TỈ % CODE ARENA', 0, -24);
  } else {
    ctx.fillText('👑 THE OWNER', 0, -22);
  }
  ctx.restore();

  ctx.restore();
}

/**
 * Hiệu ứng sàn đấu CODE ARENA của The Owner Game 7 Tỉ %
 * Bao gồm lưới tọa độ Matrix điện tử, mưa mã code nhị phân & hex rơi từ trên xuống,
 * các bảng Telemetry công nghệ HUD, đường truyền dẫn lượng tử và viền mạch điện Cyberpunk!
 */
export function drawCodeArenaDomain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  now: number,
  is7b = true
) {
  ctx.save();

  // 1. Digital Cyber Grid Floor
  const gridSize = 32;
  const gridAlpha = 0.08 + Math.sin(now * 0.003) * 0.03;
  ctx.strokeStyle = is7b ? `rgba(250, 204, 21, ${gridAlpha})` : `rgba(34, 197, 94, ${gridAlpha})`;
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Crosshair intersection nodes (+)
  ctx.fillStyle = is7b ? 'rgba(253, 224, 71, 0.28)' : 'rgba(74, 222, 128, 0.28)';
  for (let x = gridSize; x < width; x += gridSize * 2) {
    for (let y = gridSize; y < height; y += gridSize * 2) {
      if ((x + y + Math.floor(now * 0.002)) % 4 === 0) {
        ctx.fillRect(x - 2, y, 5, 1);
        ctx.fillRect(x, y - 2, 1, 5);
      }
    }
  }

  // 2. Horizontal Cyber Scanline Sweep
  const scanY = (now * 0.09) % (height + 60) - 30;
  const scanGrad = ctx.createLinearGradient(0, scanY - 25, 0, scanY + 25);
  scanGrad.addColorStop(0, 'rgba(250, 204, 21, 0)');
  scanGrad.addColorStop(0.5, is7b ? 'rgba(250, 204, 21, 0.14)' : 'rgba(34, 197, 94, 0.14)');
  scanGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
  ctx.fillStyle = scanGrad;
  ctx.fillRect(0, scanY - 25, width, 50);

  // 3. Matrix Binary & Hex Code Rain Streams (18 Columns)
  const columns = 18;
  const colSpacing = width / columns;
  const glyphs = ['0', '1', '7', 'B', 'X', 'F', 'A', 'Ω', '§', 'Δ', '0x7B', 'ROOT', '777', 'GOD', 'MELT', '0.2%'];

  ctx.font = 'bold 9px monospace';
  for (let c = 0; c < columns; c++) {
    const colX = colSpacing * c + 14;
    const speed = 70 + ((c * 23) % 80);
    const headY = ((now * 0.001 * speed) + c * 77) % (height + 220) - 40;

    // Draw 8 glyphs in the tail
    const streamLen = 8;
    for (let g = 0; g < streamLen; g++) {
      const gy = headY - g * 16;
      if (gy < -10 || gy > height + 10) continue;

      const glyphIndex = (c * 7 + g + Math.floor(now * 0.005)) % glyphs.length;
      const glyph = glyphs[glyphIndex];

      if (g === 0) {
        // Head glyph: Luminous White & Glowing
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = is7b ? '#facc15' : '#4ade80';
        ctx.shadowBlur = 10;
      } else {
        // Tail glyphs: Fading Gold / Emerald
        const fade = 1 - g / streamLen;
        ctx.fillStyle = is7b ? `rgba(253, 224, 71, ${fade * 0.65})` : `rgba(74, 222, 128, ${fade * 0.65})`;
        ctx.shadowBlur = 0;
      }
      ctx.fillText(glyph, colX, gy);
    }
  }
  ctx.shadowBlur = 0;

  // 4. Cybernetic Circuit Borders & Corner Brackets
  ctx.strokeStyle = is7b ? '#facc15' : '#22c55e';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(3, 3, width - 6, height - 6);

  // Inner dotted tech border
  ctx.save();
  ctx.strokeStyle = is7b ? 'rgba(253, 224, 71, 0.4)' : 'rgba(74, 222, 128, 0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(8, 8, width - 16, height - 16);
  ctx.restore();

  // Corner HUD Brackets
  const cornerL = 28;
  ctx.strokeStyle = is7b ? '#fbbf24' : '#38bdf8';
  ctx.lineWidth = 3.5;

  // Top Left
  ctx.beginPath();
  ctx.moveTo(3, 3 + cornerL);
  ctx.lineTo(3, 3);
  ctx.lineTo(3 + cornerL, 3);
  ctx.stroke();

  // Top Right
  ctx.beginPath();
  ctx.moveTo(width - 3 - cornerL, 3);
  ctx.lineTo(width - 3, 3);
  ctx.lineTo(width - 3, 3 + cornerL);
  ctx.stroke();

  // Bottom Left
  ctx.beginPath();
  ctx.moveTo(3, height - 3 - cornerL);
  ctx.lineTo(3, height - 3);
  ctx.lineTo(3 + cornerL, height - 3);
  ctx.stroke();

  // Bottom Right
  ctx.beginPath();
  ctx.moveTo(width - 3 - cornerL, height - 3);
  ctx.lineTo(width - 3, height - 3);
  ctx.lineTo(width - 3, height - 3 - cornerL);
  ctx.stroke();

  // 5. High-Tech Telemetry HUD Tags in Arena Corners
  ctx.save();
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = is7b ? '#fde047' : '#86efac';

  // Top Left Tag
  ctx.fillText('⚡ DOMAIN: [CODE ARENA 7B%]', 16, 24);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('ROOT::OVERRIDE [0x7B00000000]', 16, 36);

  // Top Right Tag
  ctx.textAlign = 'right';
  ctx.fillStyle = is7b ? '#fde047' : '#38bdf8';
  ctx.fillText('SYS::MELT [0.2% HP / 0.01s] ⚡', width - 16, 24);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('GOD_MODE_ACTIVE [IMMUNE 100%]', width - 16, 36);

  // Bottom Center Banner
  ctx.textAlign = 'center';
  ctx.fillStyle = is7b ? 'rgba(250, 204, 21, 0.85)' : 'rgba(34, 197, 94, 0.85)';
  ctx.fillText('>>> THE OWNER GAME: MATRIX CYBER REALM <<<', width / 2, height - 12);
  ctx.restore();

  ctx.restore();
}

/**
 * Hệ thống Animation Chém Động (Dynamic Slash Effect)
 * Nâng cấp hoạt ảnh chém: Lưỡi chém trăng khuyết, tia chém chéo xuyên thấu,
 * vệt chém Code Cyber cho The Owner 7B và vết chém nặng nề cho rìu/chùy!
 */
export function drawDynamicSlash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  radius: number,
  color: string,
  glowColor: string,
  type: 'crescent' | 'cross' | 'code_cleave' | 'heavy_cleave',
  createdAt: number,
  now: number,
  duration = 240
) {
  const elapsed = now - createdAt;
  if (elapsed < 0 || elapsed > duration) return;
  const progress = elapsed / duration;
  const alpha = Math.max(0, 1 - progress);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  if (type === 'code_cleave') {
    // 1. Digital Cyber Blade for The Owner 7B / Hacker
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 22;

    // Dual energy arc
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4 * (1 - progress * 0.4);
    ctx.beginPath();
    ctx.arc(0, 0, radius, -0.6 * Math.PI, 0.6 * Math.PI, false);
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8 * (1 - progress * 0.5);
    ctx.beginPath();
    ctx.arc(0, 0, radius - 4, -0.7 * Math.PI, 0.7 * Math.PI, false);
    ctx.stroke();

    // Matrix digital bits along the slice edge
    ctx.fillStyle = '#38bdf8';
    for (let k = -3; k <= 3; k++) {
      const sa = (k * Math.PI) / 8;
      const px = Math.cos(sa) * (radius + 6 * progress);
      const py = Math.sin(sa) * (radius + 6 * progress);
      ctx.fillRect(px - 2, py - 2, 4, 4);
    }

    // Impact core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 10 * (1 - progress), 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'cross') {
    // 2. Cross Slash
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 18;

    const len = radius * 1.5;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4 * (1 - progress);
    ctx.beginPath();
    ctx.moveTo(-len * 0.7, -len * 0.7);
    ctx.lineTo(len * 0.7, len * 0.7);
    ctx.moveTo(-len * 0.7, len * 0.7);
    ctx.lineTo(len * 0.7, -len * 0.7);
    ctx.stroke();

    ctx.strokeStyle = color;
    ctx.lineWidth = 8 * (1 - progress);
    ctx.stroke();
  } else if (type === 'heavy_cleave') {
    // 3. Heavy Axe / Mace Cleave Arc
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 20;

    const sweepW = radius * 1.6;
    const grad = ctx.createLinearGradient(-sweepW / 2, 0, sweepW / 2, 0);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    grad.addColorStop(0.5, '#ffffff');
    grad.addColorStop(0.8, color);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, sweepW / 2, (radius * 0.6) * (1 - progress), 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // 4. Standard Sharp Crescent Sword Slash
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 16;

    // Outer Glow Arc
    ctx.strokeStyle = color;
    ctx.lineWidth = 7 * (1 - progress * 0.5);
    ctx.beginPath();
    ctx.arc(0, 0, radius, -0.6 * Math.PI, 0.6 * Math.PI, false);
    ctx.stroke();

    // Inner White-Hot Razor Blade
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5 * (1 - progress * 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, radius, -0.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.stroke();

    // Kinetic speed line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-radius * 0.4, 0);
    ctx.lineTo(radius * 1.2, 0);
    ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------
// RAID THỦ THÀNH (TOWER DEFENSE / SURVIVAL)
// ----------------------------------------------------
export function drawTowerDefenseFortress(
  ctx: CanvasRenderingContext2D,
  gateHp: number,
  maxGateHp: number,
  wave: number,
  mobsKilled: number,
  coinsEarned: number,
  width: number,
  height: number,
  now: number
) {
  ctx.save();

  // 1. Fortress Wall on Left (Stone & Steel Battlements)
  const wallX = 70;
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, wallX, height);

  // Stone bricks pattern
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  for (let y = 10; y < height; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(wallX, y);
    ctx.stroke();
  }

  // Battlements Teeth
  ctx.fillStyle = '#475569';
  for (let y = 0; y < height; y += 36) {
    ctx.fillRect(wallX - 8, y, 14, 18);
  }

  // Castle Gate Archway (Cổng thành)
  const gateY = height / 2 - 45;
  const gateH = 90;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(wallX - 18, gateY, 22, gateH);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.strokeRect(wallX - 18, gateY, 22, gateH);

  // 2. Castle Gate HP Bar (Thanh máu cổng thành)
  const hpFrac = Math.max(0, gateHp / maxGateHp);
  const hpBarX = 14;
  const hpBarY = 20;
  const hpBarW = wallX - 28;
  const hpBarH = 120;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(hpBarX, hpBarY, hpBarW, hpBarH);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(hpBarX, hpBarY, hpBarW, hpBarH);

  // Vertical HP fill
  const fillH = hpBarH * hpFrac;
  const hpCol = hpFrac > 0.5 ? '#10b981' : hpFrac > 0.2 ? '#f59e0b' : '#ef4444';
  ctx.fillStyle = hpCol;
  ctx.fillRect(hpBarX + 2, hpBarY + hpBarH - fillH + 2, hpBarW - 4, fillH - 4);

  // Gate Label
  ctx.save();
  ctx.translate(hpBarX + hpBarW / 2, hpBarY + hpBarH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(`CỔNG THÀNH: ${Math.max(0, Math.round(gateHp))}/${maxGateHp}`, 0, 3);
  ctx.restore();

  // 3. Top Banner: Wave & Kill Rewards (+2.5 Xu / kill)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(width / 2 - 130, 8, 260, 26, 6);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 11px sans-serif';
  ctx.fillStyle = '#fef08a';
  ctx.textAlign = 'center';
  ctx.fillText(`🏰 THỦ THÀNH | ĐỢT ${wave} | DIỆT: ${mobsKilled} (+${coinsEarned.toFixed(1)} Xu)`, width / 2, 25);

  ctx.restore();
}

/**
 * Vẽ Tuyệt Kỹ Hợp Nhất [CỬU NGŨ CHÍ TÔN THỨC - TRẤN QUỐC CHI KIẾM]
 * Khi Bá Thường hy sinh (HP về 0), Sở Tân tức giận ngưng tụ Cự Kiếm Khổng Lồ cắm xuống đất gây 88% Max HP!
 */
export function drawTranQuocChiKiem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  now: number,
  hasStruck: boolean,
  team: 'blue' | 'red'
) {
  ctx.save();
  ctx.translate(x, y);

  const glowColor = team === 'blue' ? '#38bdf8' : '#f59e0b';
  const bladeColor = team === 'blue' ? '#0284c7' : '#d97706';

  // 1. Holy Column of Light Beam from the Sky
  ctx.save();
  const beamGrad = ctx.createLinearGradient(0, -600, 0, 100);
  beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  beamGrad.addColorStop(0.3, team === 'blue' ? 'rgba(56, 189, 248, 0.45)' : 'rgba(245, 158, 11, 0.45)');
  beamGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.7)');
  beamGrad.addColorStop(1, team === 'blue' ? 'rgba(6, 182, 212, 0.9)' : 'rgba(239, 68, 68, 0.9)');
  ctx.fillStyle = beamGrad;
  ctx.fillRect(-45, -600, 90, 700);
  ctx.restore();

  // 2. Colossal Shockwaves if sword has struck the ground
  if (hasStruck) {
    const pulse = Math.sin(now * 0.015) * 15;
    ctx.save();
    ctx.strokeStyle = team === 'blue' ? '#22d3ee' : '#fbbf24';
    ctx.lineWidth = 6;
    ctx.shadowColor = team === 'blue' ? '#06b6d4' : '#f59e0b';
    ctx.shadowBlur = 30;

    ctx.beginPath();
    ctx.ellipse(0, 10, 120 + pulse, 35 + pulse * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 10, 80 + pulse * 0.5, 22 + pulse * 0.2, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. The Colossal Celestial Sword (Trấn Quốc Chi Kiếm)
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 35;

  // Blade Body (Height: 300px, Width: 46px)
  const swordH = 260;
  const swordW = 44;

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(0, 20); // Tip
  ctx.lineTo(-swordW / 2, -swordH * 0.3);
  ctx.lineTo(-swordW * 0.45, -swordH);
  ctx.lineTo(swordW * 0.45, -swordH);
  ctx.lineTo(swordW / 2, -swordH * 0.3);
  ctx.closePath();
  ctx.fill();

  // Glowing Edge
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Inner Radiant Blade Core
  const coreGrad = ctx.createLinearGradient(0, -swordH, 0, 20);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.5, glowColor);
  coreGrad.addColorStop(1, bladeColor);
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(-swordW * 0.3, -swordH * 0.3);
  ctx.lineTo(-swordW * 0.25, -swordH * 0.95);
  ctx.lineTo(swordW * 0.25, -swordH * 0.95);
  ctx.lineTo(swordW * 0.3, -swordH * 0.3);
  ctx.closePath();
  ctx.fill();

  // Central Divine Bloodline Groove (Kích Nộ Huyết Tuyến)
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(0, -swordH * 0.9);
  ctx.lineTo(0, -10);
  ctx.stroke();

  // Crossguard (Chuôi Kiếm Cửu Ngũ Chí Tôn)
  ctx.fillStyle = '#f59e0b';
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(-swordW * 1.3, -swordH - 12, swordW * 2.6, 20, 5);
  ctx.fill();
  ctx.stroke();

  // Sword Hilt & Pommel
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-9, -swordH - 70, 18, 58);
  ctx.strokeStyle = '#facc15';
  ctx.strokeRect(-9, -swordH - 70, 18, 58);

  ctx.beginPath();
  ctx.arc(0, -swordH - 76, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#fbbf24';
  ctx.fill();
  ctx.stroke();

  // Title Banner above sword
  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = '#fef08a';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 10;
  ctx.fillText('⚔️ CỬU NGŨ CHÍ TÔN: TRẤN QUỐC CHI KIẾM (-88% MAX HP) ⚔️', 0, -swordH - 95);

  ctx.restore();
}

/**
 * Vẽ Hiệu Ứng Quất Dây Nịt Phạm Vi Khổng Lồ (AoE 280px - Cooldown 5s)
 */
export function drawDayNitWhipAoe(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  progress: number
) {
  ctx.save();
  ctx.translate(cx, cy);

  const currentRad = radius * Math.min(1, progress * 1.4);
  const alpha = Math.max(0, 1 - progress);

  // 1. Expanding Fiery Crimson & Gold Whip Shockwave Ring
  ctx.save();
  ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
  ctx.lineWidth = 8 * (1 - progress * 0.6);
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  ctx.arc(0, 0, currentRad, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(250, 204, 21, ${alpha * 0.9})`;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 0, currentRad * 0.85, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 2. Colossal Curved Leather Whip Slash Trails (Quất Dây Nịt)
  const angleStart = progress * Math.PI * 2;
  ctx.save();
  ctx.rotate(angleStart);
  ctx.strokeStyle = `rgba(180, 83, 9, ${alpha})`;
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.shadowColor = '#b45309';
  ctx.shadowBlur = 15;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    currentRad * 0.4, -currentRad * 0.5,
    currentRad * 0.8, currentRad * 0.6,
    currentRad, 0
  );
  ctx.stroke();

  // White Hot Razor Whip Core
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ Hào Quang Biển Cát "Thiên Hạ Vạn Cổ Hoành Hải Sa Trường" (Sở Tân + Bá Thường + Cần Câu)
 */
export function drawThienHaSandAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const rot1 = now * 0.003;
  const rot2 = -now * 0.0045;

  // Outer Golden Sand Swirl
  ctx.save();
  ctx.rotate(rot1);
  ctx.strokeStyle = 'rgba(234, 179, 8, 0.7)';
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner Ocean Blue Swirl
  ctx.save();
  ctx.rotate(rot2);
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Golden Sand Spores
  for (let i = 0; i < 4; i++) {
    const a = rot1 * 2 + (i * Math.PI) / 2;
    const px = Math.cos(a) * (radius + 10);
    const py = Math.sin(a) * (radius + 10);
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Vẽ Hào Quang "Buff Đồng Nghiệp" (Admin & The Owner Game)
 */
export function drawDongNghiepColleagueAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const pulse = Math.sin(now * 0.008) * 3;
  const rot = now * 0.0025;

  ctx.save();
  ctx.rotate(rot);
  // Dual Crown & Matrix Ring
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 12;
  ctx.setLineDash([10, 4, 3, 4]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 9 + pulse, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, radius + 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ Hào Quang "Tuyệt Thế Anh Hùng" (Lưu Bị + Triệu Vân / Thần-Triệu Vân)
 */
export function drawTuyetTheAnhHungAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const pulse = Math.sin(now * 0.007) * 3.5;
  const rot1 = now * 0.0035;
  const rot2 = -now * 0.004;

  // Outer Dragon Cyan Ring
  ctx.save();
  ctx.rotate(rot1);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 10;
  ctx.setLineDash([14, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 11 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner Imperial Gold Ring
  ctx.save();
  ctx.rotate(rot2);
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#facc15';
  ctx.shadowBlur = 8;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Dragon Flame Embers
  for (let i = 0; i < 4; i++) {
    const a = rot1 + (i * Math.PI) / 2;
    const px = Math.cos(a) * (radius + 9);
    const py = Math.sin(a) * (radius + 9);
    ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#facc15';
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Vẽ Hào Quang "Song Thần Giáng Thế" (Thần-Lưu Bị + Thần-Triệu Vân)
 */
export function drawSongThanGiangTheAura(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);

  const pulse = Math.sin(now * 0.01) * 4.5;
  const rot1 = now * 0.005;
  const rot2 = -now * 0.006;

  // Supreme Divine Crown Radiant Ring
  ctx.save();
  ctx.rotate(rot1);
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.95)';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 16;
  ctx.setLineDash([16, 6, 4, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 14 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Celestial Cyan Dragon Core Ring
  ctx.save();
  ctx.rotate(rot2);
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.9)';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#0ea5e9';
  ctx.shadowBlur = 12;
  ctx.setLineDash([10, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, radius + 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Divine Celestial Star Sparks
  for (let i = 0; i < 6; i++) {
    const a = rot1 * 1.5 + (i * Math.PI) / 3;
    const px = Math.cos(a) * (radius + 12 + pulse * 0.5);
    const py = Math.sin(a) * (radius + 12 + pulse * 0.5);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Vẽ Hiệu ứng Tuyệt Kỹ: Nhai Giác Lưu Tinh Trảm
 */
export function drawNhaiGiacAnimationGraphics(
  ctx: CanvasRenderingContext2D,
  anim: {
    stage: 'spinning' | 'spear_drop' | 'explosion' | 'final_thrust' | 'done';
    attackerBall: { x: number; y: number };
    targetBall: { x: number; y: number };
    spinHitCount: number;
    spearDropX: number;
    spearDropY: number;
    spearCurrentY: number;
    stageStartTime: number;
  },
  now: number
) {
  ctx.save();

  if (anim.stage === 'spinning') {
    // Rotating Golden Spears Vortex around target
    const vortexRot = now * 0.03;
    ctx.save();
    ctx.translate(anim.targetBall.x, anim.targetBall.y);
    ctx.rotate(vortexRot);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 14;

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(45, 0);
      ctx.stroke();
      // Spear head
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(45, -4);
      ctx.lineTo(58, 0);
      ctx.lineTo(45, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();

    // Slash streak rings
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.arc(anim.targetBall.x, anim.targetBall.y, 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else if (anim.stage === 'spear_drop') {
    // Colossal Divine Spear plunging from the sky into center of map
    const spearX = anim.spearDropX;
    const spearY = anim.spearCurrentY;

    // Lightning Trail
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.moveTo(spearX, 0);
    ctx.lineTo(spearX, spearY);
    ctx.stroke();

    // Giant Spear Shaft
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 20;
    ctx.fillRect(spearX - 6, spearY - 140, 12, 140);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(spearX - 2, spearY - 140, 4, 140);

    // Giant Spear Blade Head
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(spearX - 18, spearY - 20);
    ctx.lineTo(spearX, spearY + 30);
    ctx.lineTo(spearX + 18, spearY - 20);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Target Crosshair at Drop Point
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(anim.spearDropX, anim.spearDropY, 35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else if (anim.stage === 'explosion') {
    // Colossal Detonation shockwave at map center
    ctx.save();
    ctx.translate(anim.spearDropX, anim.spearDropY);
    const pulse = Math.sin((now - anim.stageStartTime) * 0.05) * 10;
    ctx.fillStyle = 'rgba(249, 115, 22, 0.35)';
    ctx.beginPath();
    ctx.arc(0, 0, 80 + pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(0, 0, 70, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else if (anim.stage === 'final_thrust') {
    // Thần-Triệu Vân final thrust dragon phantom trail
    ctx.save();
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.9)';
    ctx.lineWidth = 6;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.moveTo(anim.attackerBall.x, anim.attackerBall.y);
    ctx.lineTo(anim.targetBall.x, anim.targetBall.y);
    ctx.stroke();

    // Piercing Dragon Spark Cross
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(anim.targetBall.x - 30, anim.targetBall.y);
    ctx.lineTo(anim.targetBall.x + 30, anim.targetBall.y);
    ctx.moveTo(anim.targetBall.x, anim.targetBall.y - 30);
    ctx.lineTo(anim.targetBall.x, anim.targetBall.y + 30);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

// --- Optimized 4D & 3D Static Constants (Zero-allocation during 60 FPS game loop) ---
const TESSERACT_VERTICES: ReadonlyArray<[number, number, number, number]> = [
  [-1, -1, -1, -1], [1, -1, -1, -1], [-1, 1, -1, -1], [1, 1, -1, -1],
  [-1, -1, 1, -1], [1, -1, 1, -1], [-1, 1, 1, -1], [1, 1, 1, -1],
  [-1, -1, -1, 1], [1, -1, -1, 1], [-1, 1, -1, 1], [1, 1, -1, 1],
  [-1, -1, 1, 1], [1, -1, 1, 1], [-1, 1, 1, 1], [1, 1, 1, 1]
];

const TESSERACT_EDGES: ReadonlyArray<[number, number]> = [
  [0, 1], [0, 2], [0, 4], [0, 8], [1, 3], [1, 5], [1, 9], [2, 3],
  [2, 6], [2, 10], [3, 7], [3, 11], [4, 5], [4, 6], [4, 12], [5, 7],
  [5, 13], [6, 7], [6, 14], [7, 15], [8, 9], [8, 10], [8, 12], [9, 11],
  [9, 13], [10, 11], [10, 14], [11, 15], [12, 13], [12, 14], [13, 15], [14, 15]
];

// Preallocated point projection buffer to avoid GC spikes
const PROJ_POINTS_BUFFER: { x: number; y: number; z: number; w: number }[] = Array.from(
  { length: 16 },
  () => ({ x: 0, y: 0, z: 0, w: 0 })
);

/**
 * 4D Hypercube (Tesseract) Mathematical Projection:
 * Optimized for butter-smooth 60 FPS (zero shadowBlur in loop, precalculated topology).
 */
export function draw4DTesseract(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number,
  now: number
) {
  ctx.save();

  // 4D Rotation angles
  const rotXW = now * 0.0006;
  const rotYW = now * 0.00045;
  const rotZW = now * 0.00035;
  const rotXY = now * 0.00025;

  const sinXW = Math.sin(rotXW), cosXW = Math.cos(rotXW);
  const sinYW = Math.sin(rotYW), cosYW = Math.cos(rotYW);
  const sinZW = Math.sin(rotZW), cosZW = Math.cos(rotZW);
  const sinXY = Math.sin(rotXY), cosXY = Math.cos(rotXY);

  // Project 16 vertices in-place
  for (let i = 0; i < 16; i++) {
    const [x, y, z, w] = TESSERACT_VERTICES[i];

    // 1. Rotate in X-W plane
    const x1 = x * cosXW - w * sinXW;
    const w1 = x * sinXW + w * cosXW;

    // 2. Rotate in Y-W plane
    const y2 = y * cosYW - w1 * sinYW;
    const w2 = y * sinYW + w1 * cosYW;

    // 3. Rotate in Z-W plane
    const z3 = z * cosZW - w2 * sinZW;
    const w3 = z * sinZW + w2 * cosZW;

    // 4. Rotate in X-Y plane
    const x4 = x1 * cosXY - y2 * sinXY;
    const y4 = x1 * sinXY + y2 * cosXY;
    const z4 = z3;
    const w4 = w3;

    // Perspective projection: 4D to 3D
    const dist4D = 2.8;
    const proj4 = 1 / (dist4D - w4);
    const x3D = x4 * proj4;
    const y3D = y4 * proj4;
    const z3D = z4 * proj4;

    // Perspective projection: 3D to 2D
    const dist3D = 3.2;
    const proj3 = 1 / (dist3D - z3D);

    const pt = PROJ_POINTS_BUFFER[i];
    pt.x = centerX + x3D * proj3 * size;
    pt.y = centerY + y3D * proj3 * size;
    pt.z = z3D;
    pt.w = w4;
  }

  // Central 4D Singularity faint core
  ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 38, 0, Math.PI * 2);
  ctx.fill();

  // Draw 32 4D Tesseract Edges (Fast 2-pass neon stroke without shadowBlur)
  ctx.save();
  for (const [i1, i2] of TESSERACT_EDGES) {
    const p1 = PROJ_POINTS_BUFFER[i1];
    const p2 = PROJ_POINTS_BUFFER[i2];
    const avgW = (p1.w + p2.w) * 0.5;
    const normW = Math.max(0, Math.min(1, (avgW + 1) * 0.5));

    // Fast color determination
    const edgeColor = normW > 0.65
      ? 'rgba(236, 72, 153, 0.7)'
      : normW > 0.35
      ? 'rgba(6, 182, 212, 0.6)'
      : 'rgba(168, 85, 247, 0.4)';

    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = 1.0 + normW * 1.2;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  ctx.restore();

  // Draw 16 4D Vertex Nodes (Fast fill without shadowBlur)
  for (let i = 0; i < 16; i++) {
    const p = PROJ_POINTS_BUFFER[i];
    const nodeR = 2.2 + ((p.w + 1) * 0.5) * 1.8;
    ctx.fillStyle = (i & 8) ? '#ec4899' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(p.x, p.y, nodeR, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw 4D HUD label
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = 'rgba(34, 211, 238, 0.65)';
  ctx.fillText('4D TESSERACT HYPERCUBE [X,Y,Z,W]', 12, 18);

  ctx.restore();
}

/**
 * 3D Isometric / Perspective Grid & 3D Extruded Arena Walls (Optimized for 0 lag)
 */
export function draw3DArenaGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  now: number,
  is4D: boolean
) {
  ctx.save();

  // 1. Perspective Grid Lines (vanishing towards center-top)
  const cx = width * 0.5;
  const horizonY = height * 0.16;
  const numRadials = 10; // Optimized count

  ctx.lineWidth = 1;
  for (let i = 0; i <= numRadials; i++) {
    const bottomX = (i / numRadials) * width;
    const alpha = 0.07 + Math.abs(bottomX - cx) / width * 0.05;
    ctx.strokeStyle = is4D ? `rgba(236, 72, 153, ${alpha})` : `rgba(6, 182, 212, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(cx + (bottomX - cx) * 0.35, horizonY);
    ctx.lineTo(bottomX, height);
    ctx.stroke();
  }

  // Horizontal perspective rings
  const numHorizontals = 7; // Optimized count
  for (let j = 1; j <= numHorizontals; j++) {
    const t = j / numHorizontals;
    const y = horizonY + Math.pow(t, 1.4) * (height - horizonY);
    const alpha = 0.04 + t * 0.09;
    ctx.strokeStyle = is4D ? `rgba(168, 85, 247, ${alpha})` : `rgba(34, 211, 238, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(10, y);
    ctx.lineTo(width - 10, y);
    ctx.stroke();
  }

  // 2. 4D Spacetime Gravitational Ripples (if 4D mode) - 2 rings
  if (is4D) {
    const wavePhase = (now * 0.0012) % 1;
    for (let w = 0; w < 2; w++) {
      const p = (wavePhase + w * 0.5) % 1;
      const radius = p * 200;
      const alpha = (1 - p) * 0.28;
      ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(cx, height * 0.5, radius, radius * 0.65, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // 3. 3D Extruded Arena Wall Borders
  const pad = 6;
  const wallDepth = 8;

  // Bottom 3D Wall face
  ctx.fillStyle = is4D ? 'rgba(88, 28, 135, 0.4)' : 'rgba(8, 47, 73, 0.5)';
  ctx.beginPath();
  ctx.moveTo(pad, height - pad);
  ctx.lineTo(width - pad, height - pad);
  ctx.lineTo(width - pad - wallDepth, height - pad + wallDepth);
  ctx.lineTo(pad + wallDepth, height - pad + wallDepth);
  ctx.closePath();
  ctx.fill();

  // 3D Outer border line (no shadowBlur to maintain 60 FPS)
  ctx.strokeStyle = is4D ? 'rgba(236, 72, 153, 0.85)' : 'rgba(6, 182, 212, 0.85)';
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  // 3D Corner Bevel Pillars
  const pillarLen = 16;
  ctx.lineWidth = 3;
  ctx.strokeStyle = is4D ? '#facc15' : '#38bdf8';

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(pad, pad + pillarLen);
  ctx.lineTo(pad, pad);
  ctx.lineTo(pad + pillarLen, pad);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(width - pad - pillarLen, pad);
  ctx.lineTo(width - pad, pad);
  ctx.lineTo(width - pad, pad + pillarLen);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(pad, height - pad - pillarLen);
  ctx.lineTo(pad, height - pad);
  ctx.lineTo(pad + pillarLen, height - pad);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(width - pad - pillarLen, height - pad);
  ctx.lineTo(width - pad, height - pad);
  ctx.lineTo(width - pad, height - pad - pillarLen);
  ctx.stroke();

  ctx.restore();
}

/**
 * 3D Volumetric Sphere Shading with Light Source & Specular Highlight (Optimized)
 */
export function draw3DVolumetricSphere(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  baseColor: string,
  borderColor: string,
  is4D: boolean,
  now: number
) {
  // 1. Dynamic 3D Ground Shadow
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(x, y + radius * 0.85, radius * 1.05, radius * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. 4D Quantum Dimensional Echoes (if 4D mode) - subtle fast circles
  if (is4D) {
    const wShiftX = Math.sin(now * 0.0025) * 8;
    const wShiftY = Math.cos(now * 0.0025) * 7;

    ctx.fillStyle = 'rgba(6, 182, 212, 0.22)';
    ctx.beginPath();
    ctx.arc(x - wShiftX, y - wShiftY, radius * 0.88, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(236, 72, 153, 0.22)';
    ctx.beginPath();
    ctx.arc(x + wShiftX, y + wShiftY, radius * 0.88, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Fast 3D Sphere gradient
  const lightX = x - radius * 0.3;
  const lightY = y - radius * 0.3;

  const grad = ctx.createRadialGradient(
    lightX,
    lightY,
    radius * 0.1,
    x,
    y,
    radius
  );
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.3, baseColor);
  grad.addColorStop(0.9, '#050c1e');
  grad.addColorStop(1, '#000000');

  ctx.fillStyle = grad;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

/**
 * ------------------------------------------------------------------
 * STELLAR REMOTE: COSMIC SATELLITE ORBITAL CUTSCENES & VISUAL EFFECTS
 * ------------------------------------------------------------------
 */

// Draw starfield background helper
function drawCosmicStarfield(ctx: CanvasRenderingContext2D, width: number, height: number, now: number) {
  ctx.fillStyle = '#01030d';
  ctx.fillRect(0, 0, width, height);

  // Deep space cosmic dust nebula gradient
  const nebula = ctx.createRadialGradient(width * 0.5, height * 0.45, 20, width * 0.5, height * 0.5, width * 0.65);
  nebula.addColorStop(0, 'rgba(49, 16, 82, 0.45)');
  nebula.addColorStop(0.5, 'rgba(12, 34, 76, 0.3)');
  nebula.addColorStop(1, 'rgba(1, 3, 13, 0)');
  ctx.fillStyle = nebula;
  ctx.fillRect(0, 0, width, height);

  // Background stars
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 45; i++) {
    const sx = ((i * 73 + 17) % width);
    const sy = ((i * 109 + 31) % height);
    const pulse = Math.sin(now * 0.003 + i) * 0.4 + 0.6;
    const r = (i % 3 === 0 ? 1.8 : 1.0) * pulse;
    ctx.globalAlpha = 0.35 + 0.55 * pulse;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
}

/**
 * Helper to render authentic military Sci-Fi Orbital Strike HUD in crimson red
 * matching the user's reference screenshots.
 */
function drawRailgunTacticalHUD(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  timerStr: string,
  impactSec: number,
  scaleStr: string,
  rangeStr: string,
  lockStr = 'LOCK 1933 / 66 / -054',
  skmStr = '0.0 skm'
) {
  ctx.save();
  ctx.font = 'bold 10px monospace';
  ctx.fillStyle = '#ef4444';
  ctx.strokeStyle = '#ef4444';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 4;

  // Top-left: UPLINK // SS-01 > THE SHOOTING STAR & Timer
  ctx.textAlign = 'left';
  ctx.fillText('UPLINK // SS-01 > THE SHOOTING STAR', 18, 22);
  ctx.font = '10px monospace';
  ctx.fillText(timerStr, 18, 35);

  // Top-right: IMPACT T - 12.63 (or counting down)
  ctx.textAlign = 'right';
  ctx.font = 'bold 10.5px monospace';
  ctx.fillText(`IMPACT T - ${impactSec.toFixed(2)}`, width - 18, 22);

  // Bottom-left: Bracket box with SCALE and RANGE
  ctx.textAlign = 'left';
  const bY = height - 42;
  // Corner bracket
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(18, bY - 8);
  ctx.lineTo(18, bY + 24);
  ctx.lineTo(135, bY + 24);
  ctx.stroke();

  ctx.fillText(scaleStr, 24, bY + 6);
  ctx.font = '9px monospace';
  ctx.fillText(rangeStr, 24, bY + 18);

  // Bottom-right: LOCK & speed
  ctx.textAlign = 'right';
  ctx.font = '9px monospace';
  ctx.fillText(skmStr, width - 18, height - 30);
  ctx.fillText(lockStr, width - 18, height - 18);

  ctx.restore();
}

/**
 * Render Cutscenes for SS-01 Railgun, SS-03 Gungir, SS-04 Seven Star, SS-05 Tesseract
 */
export function drawStellarCutscene(
  ctx: CanvasRenderingContext2D,
  cs: StellarCutsceneState,
  width: number,
  height: number,
  now: number
) {
  const elapsed = now - cs.startTime;
  ctx.save();

  drawCosmicStarfield(ctx, width, height, now);

  const cx = width / 2;
  const cy = height / 2;

  if (cs.skillKey === 'ss01_railgun') {
    // ----------------------------------------------------------------
    // SS-01: RAILGUN (THE SHOOTING STAR - AUTHENTIC ORBITAL STRIKE HUD)
    // Recreated with 100% fidelity from the user's reference screenshots:
    // Scene 1 (0-2100ms): Earth view with day/night terminator, glowing city lights,
    //                     red targeting reticle, and crimson laser shooting to bottom-left.
    // Scene 2 (2100-4200ms): Solar System view with Sun, concentric cyan planetary orbits
    //                     (Jupiter 5.2 AU, Saturn 9.58 AU, Uranus 19.2 AU, Neptune 30.1 AU),
    //                     Milky Way star dust band in background, red laser shooting down.
    // Scene 3 (4200-6400ms): Milky Way panoramic tilted spiral galaxy with core bracket,
    //                     MILKY WAY 100,000 LY, SOL 26,400 LY TO CORE,
    //                     and red beam shooting upward into deep space.
    // Scene 4 (6400-8400ms): Deep intergalactic space looking down at Milky Way rim,
    //                     laser connects to + SS-01 + RAILGUN 50,000 LY lock-on,
    //                     orbital citadel charges and unleashes relativistic beam!
    // ----------------------------------------------------------------
    if (elapsed < 2100) {
      // ==============================================================
      // SCENE 1: EARTH VIEW (IMAGE 1)
      // ==============================================================
      const earthRadius = Math.min(135, width * 0.26);
      const earthX = cx - 8;
      const earthY = cy + 18;

      // Distant spiral galaxy (Andromeda) in upper-right
      ctx.save();
      ctx.translate(width - 55, 65);
      ctx.rotate(-0.35);
      const andGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, 18);
      andGrad.addColorStop(0, '#ffffff');
      andGrad.addColorStop(0.35, '#cbd5e1');
      andGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = andGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Earth atmospheric cyan limb haze
      const atmGrad = ctx.createRadialGradient(earthX, earthY, earthRadius * 0.95, earthX, earthY, earthRadius * 1.18);
      atmGrad.addColorStop(0, 'rgba(56, 189, 248, 0.55)');
      atmGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.25)');
      atmGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = atmGrad;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // Earth Globe clipping
      ctx.save();
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
      ctx.clip();

      // 1. Day Ocean Base
      const oceanGrad = ctx.createRadialGradient(earthX - earthRadius * 0.35, earthY - earthRadius * 0.35, 5, earthX, earthY, earthRadius);
      oceanGrad.addColorStop(0, '#38bdf8');
      oceanGrad.addColorStop(0.3, '#0284c7');
      oceanGrad.addColorStop(0.75, '#0369a1');
      oceanGrad.addColorStop(1, '#075985');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(earthX - earthRadius, earthY - earthRadius, earthRadius * 2, earthRadius * 2);

      // 2. Continents (North America, Gulf of Mexico, Central America)
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(earthX - earthRadius * 0.25, earthY - earthRadius * 0.15, earthRadius * 0.42, 0, Math.PI * 2);
      ctx.arc(earthX - earthRadius * 0.05, earthY + earthRadius * 0.15, earthRadius * 0.32, 0, Math.PI * 2);
      ctx.arc(earthX - earthRadius * 0.45, earthY + earthRadius * 0.05, earthRadius * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // Mountain / Arid plateaus
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(earthX - earthRadius * 0.35, earthY - earthRadius * 0.2, earthRadius * 0.22, 0, Math.PI * 2);
      ctx.arc(earthX - earthRadius * 0.15, earthY + earthRadius * 0.2, earthRadius * 0.18, 0, Math.PI * 2);
      ctx.fill();

      // 3. Swirling White Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
      ctx.beginPath();
      ctx.ellipse(earthX - earthRadius * 0.1, earthY - earthRadius * 0.25, earthRadius * 0.55, earthRadius * 0.18, -0.3, 0, Math.PI * 2);
      ctx.ellipse(earthX - earthRadius * 0.35, earthY + earthRadius * 0.2, earthRadius * 0.42, earthRadius * 0.15, 0.4, 0, Math.PI * 2);
      ctx.ellipse(earthX + earthRadius * 0.05, earthY + earthRadius * 0.35, earthRadius * 0.35, earthRadius * 0.12, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // 4. Night Terminator Shadow (Upper Right Hemisphere)
      ctx.save();
      ctx.translate(earthX, earthY);
      ctx.rotate(-0.55); // Terminator angle
      const nightGrad = ctx.createLinearGradient(0, -earthRadius, 0, earthRadius);
      nightGrad.addColorStop(0, 'rgba(3, 7, 18, 0.96)');
      nightGrad.addColorStop(0.48, 'rgba(3, 7, 18, 0.92)');
      nightGrad.addColorStop(0.55, 'rgba(3, 7, 18, 0.4)');
      nightGrad.addColorStop(0.65, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = nightGrad;
      ctx.fillRect(-earthRadius, -earthRadius, earthRadius * 2, earthRadius);

      // Night City Lights (Golden twinkling clusters)
      const cityLights = [
        { x: -25, y: -55, r: 1.5 }, { x: -12, y: -65, r: 2.0 }, { x: 5, y: -75, r: 1.8 },
        { x: 25, y: -58, r: 1.6 }, { x: 42, y: -45, r: 2.2 }, { x: 18, y: -42, r: 1.5 },
        { x: -8, y: -45, r: 2.5 }, { x: -35, y: -40, r: 1.7 }, { x: 30, y: -30, r: 1.9 },
        { x: 55, y: -25, r: 1.6 }, { x: 12, y: -22, r: 2.2 }, { x: 65, y: -15, r: 1.4 }
      ];
      cityLights.forEach((c, idx) => {
        const twinkle = 0.7 + 0.3 * Math.sin(now * 0.005 + idx * 1.5);
        ctx.fillStyle = idx % 2 === 0 ? `rgba(253, 224, 71, ${twinkle})` : `rgba(251, 191, 36, ${twinkle})`;
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.restore();

      ctx.restore(); // End Earth Globe clipping

      // Target on Day Side
      const targetX = earthX - earthRadius * 0.14;
      const targetY = earthY + earthRadius * 0.12;

      // Red Targeting Reticle
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(targetX - 7, targetY - 7, 14, 14);
      ctx.beginPath();
      ctx.moveTo(targetX - 10, targetY);
      ctx.lineTo(targetX + 10, targetY);
      ctx.moveTo(targetX, targetY - 10);
      ctx.lineTo(targetX, targetY + 10);
      ctx.stroke();

      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'left';
      ctx.fillText('TARGET', targetX + 11, targetY - 2);
      ctx.font = '8px monospace';
      ctx.fillText('34.0522 N, 118.2437 W', targetX + 11, targetY + 8);

      // Crimson Laser Line shooting to bottom-left corner
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(targetX, targetY);
      ctx.lineTo(0, height * 0.95);
      ctx.stroke();

      // Pure white beam core
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Tactical Sci-Fi HUD
      const impactCountdown = Math.max(0, 12.63 - (elapsed / 2100) * 2.2);
      drawRailgunTacticalHUD(ctx, width, height, 'T - 04:37', impactCountdown, 'SCALE 10^4 KM', 'RANGE 65,355 KM');

    } else if (elapsed < 4200) {
      // ==============================================================
      // SCENE 2: SOLAR SYSTEM ORBITAL VIEW (IMAGE 2)
      // ==============================================================
      const sunX = cx - 8;
      const sunY = cy - 25;

      // Diagonal Milky Way Stardust Band running from bottom-left to top-left
      ctx.save();
      ctx.translate(sunX - 120, sunY + 60);
      ctx.rotate(-0.85);
      const mwBandGrad = ctx.createLinearGradient(-150, 0, 150, 0);
      mwBandGrad.addColorStop(0, 'rgba(0,0,0,0)');
      mwBandGrad.addColorStop(0.3, 'rgba(148, 163, 184, 0.12)');
      mwBandGrad.addColorStop(0.5, 'rgba(226, 232, 240, 0.22)');
      mwBandGrad.addColorStop(0.7, 'rgba(148, 163, 184, 0.12)');
      mwBandGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mwBandGrad;
      ctx.fillRect(-150, -height, 300, height * 2);
      ctx.restore();

      // Central Sun
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 24);
      sunGrad.addColorStop(0, '#ffffff');
      sunGrad.addColorStop(0.35, '#fef08a');
      sunGrad.addColorStop(0.75, '#f59e0b');
      sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 24, 0, Math.PI * 2);
      ctx.fill();

      // Concentric Tilted Cyan Planetary Orbits
      const orbitData = [
        { rX: 30, rY: 18, label: '' },
        { rX: 52, rY: 32, label: '' },
        { rX: 86, rY: 54, label: 'JUPITER\n5.2 AU', textX: 72, textY: -8 },
        { rX: 132, rY: 82, label: 'SATURN\n9.58 AU', textX: 110, textY: -2 },
        { rX: 178, rY: 112, label: 'URANUS\n19.2 AU', textX: 148, textY: 8 },
        { rX: 228, rY: 142, label: 'NEPTUNE\n30.1 AU', textX: 190, textY: 20 }
      ];

      orbitData.forEach(ob => {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(sunX, sunY, ob.rX, ob.rY, 0.12, 0, Math.PI * 2);
        ctx.stroke();

        if (ob.label) {
          ctx.font = 'bold 8.5px monospace';
          ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
          ctx.textAlign = 'left';
          const lines = ob.label.split('\n');
          lines.forEach((l, lIdx) => {
            ctx.fillText(l, sunX + ob.textX!, sunY + ob.textY! + lIdx * 10);
          });
        }
      });

      // Earth Target Position on Inner Orbit
      const earthOrbX = sunX - 2;
      const earthOrbY = sunY + 28;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(earthOrbX, earthOrbY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(earthOrbX - 5, earthOrbY - 5, 10, 10);

      // Crimson Laser Line cutting straight down through all orbits
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(earthOrbX, earthOrbY);
      ctx.lineTo(cx - 24, height);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Tactical Sci-Fi HUD
      const impactCountdown = Math.max(0, 10.43 - ((elapsed - 2100) / 2100) * 2.5);
      drawRailgunTacticalHUD(ctx, width, height, 'T - 06:18', impactCountdown, 'SCALE 10^10 KM', 'RANGE 13,833,371,689 KM');

    } else if (elapsed < 6400) {
      // ==============================================================
      // SCENE 3: MILKY WAY GALAXY PANORAMIC VIEW (IMAGE 3)
      // ==============================================================
      const mwX = cx;
      const mwY = cy + 22;

      // Galactic Tilted Perspective
      ctx.save();
      ctx.translate(mwX, mwY);
      ctx.rotate(-0.1);
      ctx.scale(1.0, 0.36); // Inclined galactic plane

      // Multi-armed Logarithmic Spiral Dust Lanes
      for (let arm = 0; arm < 4; arm++) {
        const armOffset = (arm * Math.PI) / 2;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2.8; a += 0.08) {
          const r = 24 + a * 34;
          const px = Math.cos(a + armOffset) * r;
          const py = Math.sin(a + armOffset) * r;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = arm % 2 === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(99, 102, 241, 0.4)';
        ctx.lineWidth = 14;
        ctx.stroke();

        // Pink/Magenta H-II Starburst Nebulae knots along the arms
        for (let k = 0; k < 6; k++) {
          const kA = 0.8 + k * 0.42;
          const kR = 24 + kA * 34;
          const kX = Math.cos(kA + armOffset) * kR;
          const kY = Math.sin(kA + armOffset) * kR;
          ctx.fillStyle = k % 2 === 0 ? 'rgba(244, 114, 182, 0.65)' : 'rgba(251, 113, 133, 0.6)';
          ctx.beginPath();
          ctx.arc(kX, kY, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Brilliant Galactic Bulge & Core
      const coreGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, 75);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.35, '#fffbeb');
      coreGrad.addColorStop(0.65, '#fef08a');
      coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 75, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // End galaxy scale

      // Cyan 4-Corner Bracket Reticle around Galactic Core
      const bW = 110;
      const bH = 50;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
      ctx.lineWidth = 1.2;
      // Top-left
      ctx.beginPath();
      ctx.moveTo(mwX - bW / 2, mwY - bH / 2 + 12);
      ctx.lineTo(mwX - bW / 2, mwY - bH / 2);
      ctx.lineTo(mwX - bW / 2 + 12, mwY - bH / 2);
      // Top-right
      ctx.moveTo(mwX + bW / 2 - 12, mwY - bH / 2);
      ctx.lineTo(mwX + bW / 2, mwY - bH / 2);
      ctx.lineTo(mwX + bW / 2, mwY - bH / 2 + 12);
      // Bottom-left
      ctx.moveTo(mwX - bW / 2, mwY + bH / 2 - 12);
      ctx.lineTo(mwX - bW / 2, mwY + bH / 2);
      ctx.lineTo(mwX - bW / 2 + 12, mwY + bH / 2);
      // Bottom-right
      ctx.moveTo(mwX + bW / 2 - 12, mwY + bH / 2);
      ctx.lineTo(mwX + bW / 2, mwY + bH / 2);
      ctx.lineTo(mwX + bW / 2, mwY + bH / 2 - 12);
      ctx.stroke();

      // Label: MILKY WAY 100,000 LY
      ctx.font = 'bold 8.5px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.textAlign = 'left';
      ctx.fillText('MILKY WAY', mwX + 62, mwY - 4);
      ctx.fillText('100,000 LY', mwX + 62, mwY + 6);

      // SOL Marker on Outer Orion Arm
      const solX = mwX + 88;
      const solY = mwY - 10;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(solX, solY, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = 'bold 8.5px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('SOL', solX + 7, solY - 2);
      ctx.font = '8px monospace';
      ctx.fillStyle = 'rgba(254, 202, 202, 0.85)';
      ctx.fillText('26,400 LY TO CORE', solX + 7, solY + 8);

      // Crimson Laser Line shooting UPWARDS into deep space
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(solX, solY);
      ctx.lineTo(cx + 80, 0);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Tactical Sci-Fi HUD
      const impactCountdown = Math.max(0, 7.93 - ((elapsed - 4200) / 2200) * 2.8);
      drawRailgunTacticalHUD(ctx, width, height, 'T - 10:35', impactCountdown, 'SCALE 10^17 KM', 'RANGE 69,334 LY');

    } else {
      // ==============================================================
      // SCENE 4: DEEP COSMOS & SS-01 STATION LOCK-ON & FIRING (IMAGE 4)
      // ==============================================================
      // Curved edge of Milky Way glowing below at the bottom
      const mwEdgeGrad = ctx.createRadialGradient(cx, height + 90, 40, cx, height + 90, width * 0.75);
      mwEdgeGrad.addColorStop(0, '#ffffff');
      mwEdgeGrad.addColorStop(0.3, '#93c5fd');
      mwEdgeGrad.addColorStop(0.7, '#3b82f6');
      mwEdgeGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = mwEdgeGrad;
      ctx.beginPath();
      ctx.ellipse(cx, height + 85, width * 0.85, 115, 0, Math.PI, 0);
      ctx.fill();

      // Laser Line originating from Milky Way below and reaching up to SS-01 Station
      const ss01X = cx + 18;
      const ss01Y = cy - 65;

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(cx + 98, height);
      ctx.lineTo(ss01X, ss01Y);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Red Target Reticle locked on SS-01
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(ss01X - 9, ss01Y - 9, 18, 18);
      ctx.beginPath();
      ctx.moveTo(ss01X - 14, ss01Y);
      ctx.lineTo(ss01X + 14, ss01Y);
      ctx.moveTo(ss01X, ss01Y - 14);
      ctx.lineTo(ss01X, ss01Y + 14);
      ctx.stroke();

      // Text: + SS-01 + RAILGUN 50,000 LY
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'left';
      ctx.fillText('+ SS-01 +', ss01X + 13, ss01Y - 2);
      ctx.font = '8px monospace';
      ctx.fillText('RAILGUN 50,000 LY', ss01X + 13, ss01Y + 9);

      // Outer Space Railgun Citadel / Dyson Station Architecture
      ctx.save();
      ctx.translate(ss01X, ss01Y);

      // Concentric Rotating Relativistic Accelerator Rings
      ctx.rotate(now * 0.003);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.stroke();

      ctx.rotate(-now * 0.005);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-18, -18, 36, 36);

      // Station Core Energy Accumulation
      const isFiring = elapsed >= 7500;
      const coreR = isFiring ? 35 : 12 + ((elapsed - 6400) / 1100) * 14;
      const cGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, coreR);
      cGrad.addColorStop(0, '#ffffff');
      cGrad.addColorStop(0.3, '#fca5a5');
      cGrad.addColorStop(0.7, '#ef4444');
      cGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreR, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Lightspeed Firing Flash back towards Earth
      if (isFiring) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.fillRect(0, 0, width, height);

        // Colossal return strike beam
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 14;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.moveTo(ss01X, ss01Y);
        ctx.lineTo(cx + 98, height);
        ctx.stroke();

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 30;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Tactical Sci-Fi HUD
      const impactCountdown = Math.max(0, 5.13 - ((elapsed - 6400) / 2000) * 5.13);
      drawRailgunTacticalHUD(ctx, width, height, 'T - 18:00', impactCountdown, 'SCALE 10^17 KM', 'RANGE 69,333 LY');
    }
  } else if (cs.skillKey === 'ss03_gungir') {
    // ----------------------------------------------------------------
    // SS-03: GUNGIR (JUPITER SPLIT & TUNGSTEN ARROW & TSAR BOMBA)
    // 1. Earth orange targeting beam (0-1400ms)
    // 2. Flight reaching Jupiter (1400-3200ms)
    // 3. Jupiter splits open & Tungsten Arrow appears (3200-5200ms)
    // 4. Tungsten rod hyper-speed spin & plunge (5200-7200ms)
    // ----------------------------------------------------------------
    if (elapsed < 1400) {
      // Orange targeting beam from Earth
      const earthRadius = 80;
      const earthY = cy + 45;
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(cx, earthY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Orange beam piercing space
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 5;
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(cx, earthY - earthRadius * 0.5);
      ctx.lineTo(cx, 0);
      ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      drawBannerText(ctx, '🛰️ [SS-03: GUNGIR] - TIA SÁNG CAM KÍCH HOẠT HỆ THỐNG...', '#f97316', cx, height - 35);
    } else if (elapsed < 3200) {
      // Reaching Jupiter
      const t = (elapsed - 1400) / 1800;
      const jupRadius = 75 + t * 25;
      drawJupiter(ctx, cx, cy, jupRadius, 0);

      drawBannerText(ctx, '🪐 TIẾP CẬN SAO MỘC (JUPITER)...', '#fb923c', cx, height - 35);
    } else if (elapsed < 5200) {
      // Jupiter splits open!
      const t = (elapsed - 3200) / 2000;
      const splitDist = t * 65;

      // Left Hemisphere
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, cx, height);
      ctx.clip();
      ctx.translate(-splitDist, 0);
      drawJupiter(ctx, cx, cy, 95, 0);
      ctx.restore();

      // Right Hemisphere
      ctx.save();
      ctx.beginPath();
      ctx.rect(cx, 0, width - cx, height);
      ctx.clip();
      ctx.translate(splitDist, 0);
      drawJupiter(ctx, cx, cy, 95, 0);
      ctx.restore();

      // Fiery inner core magma
      const coreGrad = ctx.createLinearGradient(cx - 20, 0, cx + 20, 0);
      coreGrad.addColorStop(0, 'rgba(249, 115, 22, 0)');
      coreGrad.addColorStop(0.5, 'rgba(255, 237, 213, 0.95)');
      coreGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(cx - 30, cy - 100, 60, 200);

      // Pitch-black 3D Tungsten Drill emerging from Jupiter's core rift!
      const drillSlowRot = (elapsed - 3200) * 0.003;
      draw3DTungstenDrill(ctx, cx, cy, drillSlowRot, 1.1 + t * 0.25, 0, false, now);

      drawBannerText(ctx, '💥 SAO MỘC TÁCH ĐÔI! MŨI KHOAN TUNGSTEN 3D NGUYÊN KHỐI XUẤT HIỆN!', '#fdba74', cx, height - 35);
    } else {
      // 3D Tungsten Drill spinning at hyper speed on its longitudinal drill axis & plunging downward
      const drillFastRot = (now - cs.startTime) * 0.045;
      const plungeProgress = Math.min(1, (elapsed - 5200) / 2000);
      const plungeY = cy + plungeProgress * 35;

      // Re-entry fire vortex
      ctx.save();
      ctx.translate(cx, plungeY);

      const fireGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 110);
      fireGrad.addColorStop(0, '#ffffff');
      fireGrad.addColorStop(0.3, '#f97316');
      fireGrad.addColorStop(0.7, '#ea580c');
      fireGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = fireGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 110, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Cavitation Spiral Rings
      ctx.strokeStyle = 'rgba(255, 237, 213, 0.7)';
      ctx.lineWidth = 2;
      for (let cr = 0; cr < 3; cr++) {
        const cPhase = ((now * 0.005 + cr * 0.33) % 1);
        ctx.beginPath();
        ctx.arc(0, 0, 40 + cPhase * 80, 0, Math.PI * 2);
        ctx.stroke();
      }

      draw3DTungstenDrill(ctx, 0, 0, drillFastRot, 1.5, 0, true, now);
      ctx.restore();

      drawBannerText(ctx, '🌪️ MŨI KHOAN TUNGSTEN 3D XOAY TÍT TỐC ĐỘ SIÊU ÂM - LAO XUỐNG VỤ NỔ SA HOÀNG!', '#ea580c', cx, height - 35);
    }
  } else if (cs.skillKey === 'ss04_seven_star') {
    // ----------------------------------------------------------------
    // SS-04: SEVEN STAR (BẮC ĐẨU THẤT TINH - CHÒM SAO ĐÍCH THỰC)
    // 7 ngôi sao Bắc Đẩu: Thiên Xu, Thiên Tuyền, Thiên Cơ, Thiên Quyền,
    // Ngọc Hoành, Khai Dương, Dao Quang.
    // Từng cái nạp năng lượng -> nạp xong thì lao xuống -> cứ lặp lại!
    // Cái nạp đầu tiên được chọn NGẪU NHIÊN!
    // ----------------------------------------------------------------
    const BIG_DIPPER_STARS = [
      { id: 0, name: 'Thiên Xu', en: 'Dubhe', glyph: 'α', xR: 0.29, yR: 0.25, color: '#fde047', size: 9 },
      { id: 1, name: 'Thiên Tuyền', en: 'Merak', glyph: 'β', xR: 0.27, yR: 0.44, color: '#38bdf8', size: 8.5 },
      { id: 2, name: 'Thiên Cơ', en: 'Phecda', glyph: 'γ', xR: 0.43, yR: 0.48, color: '#60a5fa', size: 8.5 },
      { id: 3, name: 'Thiên Quyền', en: 'Megrez', glyph: 'δ', xR: 0.47, yR: 0.32, color: '#c084fc', size: 7.5 },
      { id: 4, name: 'Ngọc Hoành', en: 'Alioth', glyph: 'ε', xR: 0.61, yR: 0.29, color: '#fde047', size: 10 },
      { id: 5, name: 'Khai Dương', en: 'Mizar', glyph: 'ζ', xR: 0.73, yR: 0.23, color: '#a78bfa', size: 9 },
      { id: 6, name: 'Dao Quang', en: 'Alkaid', glyph: 'η', xR: 0.85, yR: 0.16, color: '#38bdf8', size: 9.5 }
    ];

    // Compute screen coordinates for the 7 stars
    const starCoords = BIG_DIPPER_STARS.map(s => ({
      ...s,
      x: s.xR * width,
      y: s.yR * height
    }));

    // Ensure first star is randomly selected for the loop
    if (!cs.data || typeof cs.data.firstStarIndex !== 'number') {
      cs.data = {
        firstStarIndex: Math.floor(Math.random() * 7),
        startTime: now
      };
    }
    const firstIdx = cs.data.firstStarIndex;

    // Background Celestial Astral Wheel & Ley Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy * 0.7, width * 0.42, 0, Math.PI * 2);
    ctx.stroke();

    // 1. Draw Authentic Constellation Connecting Ley Lines
    // Bowl: Thiên Xu (0) -> Thiên Tuyền (1) -> Thiên Cơ (2) -> Thiên Quyền (3) -> Thiên Xu (0)
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(starCoords[0].x, starCoords[0].y);
    ctx.lineTo(starCoords[1].x, starCoords[1].y);
    ctx.lineTo(starCoords[2].x, starCoords[2].y);
    ctx.lineTo(starCoords[3].x, starCoords[3].y);
    ctx.closePath();
    ctx.stroke();

    // Handle: Thiên Quyền (3) -> Ngọc Hoành (4) -> Khai Dương (5) -> Dao Quang (6)
    ctx.beginPath();
    ctx.moveTo(starCoords[3].x, starCoords[3].y);
    ctx.lineTo(starCoords[4].x, starCoords[4].y);
    ctx.lineTo(starCoords[5].x, starCoords[5].y);
    ctx.lineTo(starCoords[6].x, starCoords[6].y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Pointer line from Merak through Dubhe pointing northwards
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(starCoords[1].x, starCoords[1].y);
    ctx.lineTo(starCoords[0].x, starCoords[0].y);
    ctx.lineTo(starCoords[0].x + (starCoords[0].x - starCoords[1].x) * 1.5, starCoords[0].y + (starCoords[0].y - starCoords[1].y) * 1.5);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Cycle Choreography:
    // Từng ngôi sao nạp năng lượng -> nạp xong thì lao xuống -> cứ lặp lại!
    // Bắt đầu từ firstIdx (ngẫu nhiên)
    const STEP_DURATION = 980; // ~1s per star
    const currentStep = Math.floor(elapsed / STEP_DURATION);
    const activeStarIdx = (firstIdx + currentStep) % 7;
    const stepProgress = elapsed % STEP_DURATION;
    const isCharging = stepProgress < 560; // 0-560ms: Nạp năng lượng
    const plungeProgress = isCharging ? 0 : (stepProgress - 560) / 420; // 560-980ms: Lao xuống!

    const activeStar = starCoords[activeStarIdx];

    // 3. Render all stationary constellation stars
    starCoords.forEach((st, idx) => {
      const isCurrent = idx === activeStarIdx;
      // If this star is plunging, we draw its diving meteor separately
      if (isCurrent && !isCharging) return;

      const baseRad = st.size;
      const chargeScale = isCurrent && isCharging ? 1 + (stepProgress / 560) * 1.2 : 1;
      const rad = baseRad * chargeScale;

      // Celestial Aura Halo
      const sGrad = ctx.createRadialGradient(st.x, st.y, 2, st.x, st.y, rad * 2.8);
      sGrad.addColorStop(0, '#ffffff');
      sGrad.addColorStop(0.35, st.color);
      sGrad.addColorStop(0.75, 'rgba(56, 189, 248, 0.4)');
      sGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sGrad;
      ctx.beginPath();
      ctx.arc(st.x, st.y, rad * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Core Star
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(st.x, st.y, rad * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // 4-point diffraction spike
      ctx.strokeStyle = isCurrent ? '#ffffff' : st.color;
      ctx.lineWidth = isCurrent ? 2 : 1.2;
      const spikeLen = rad * (isCurrent ? 3.2 : 1.8);
      ctx.beginPath();
      ctx.moveTo(st.x - spikeLen, st.y);
      ctx.lineTo(st.x + spikeLen, st.y);
      ctx.moveTo(st.x, st.y - spikeLen);
      ctx.lineTo(st.x, st.y + spikeLen);
      ctx.stroke();

      // Sacred Chinese/Vietnamese Star Name Label
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = isCurrent ? '#facc15' : '#e2e8f0';
      ctx.textAlign = 'center';
      ctx.fillText(`${st.name} (${st.glyph})`, st.x, st.y + rad + 14);

      // Inward energy streams when charging
      if (isCurrent && isCharging) {
        for (let ray = 0; ray < 8; ray++) {
          const rAng = (ray * Math.PI) / 4 + now * 0.006;
          const rDist = 55 - (stepProgress * 0.08) % 45;
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(st.x + Math.cos(rAng) * rDist, st.y + Math.sin(rAng) * rDist);
          ctx.lineTo(st.x + Math.cos(rAng) * (rDist - 12), st.y + Math.sin(rAng) * (rDist - 12));
          ctx.stroke();
        }

        // Concentric charging pulse ring
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(st.x, st.y, rad * 2.2 + Math.sin(now * 0.02) * 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // 4. Render Active Star Plunging Downward ("nạp xong thì lao xuống")
    if (!isCharging) {
      const startX = activeStar.x;
      const startY = activeStar.y;
      const targetY = height - 60;
      const currentY = startY + plungeProgress * (targetY - startY + 50);

      // Blazing Celestial Comet Tail
      const tailGrad = ctx.createLinearGradient(startX, currentY, startX, currentY - 140);
      tailGrad.addColorStop(0, '#ffffff');
      tailGrad.addColorStop(0.2, '#fde047');
      tailGrad.addColorStop(0.6, '#f97316');
      tailGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(startX - 18, currentY);
      ctx.lineTo(startX, currentY - 140);
      ctx.lineTo(startX + 18, currentY);
      ctx.closePath();
      ctx.fill();

      // Diving Star Core
      drawStellarMeteor(ctx, startX, currentY, Math.PI / 2, 16, activeStar.color, now);

      // Impact explosion when near bottom
      if (plungeProgress > 0.8) {
        const impactR = (plungeProgress - 0.8) * 5 * 80;
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(startX, targetY, impactR, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Banner Text updating dynamically per star
    if (isCharging) {
      drawBannerText(
        ctx,
        `⭐ [NGÔI SAO #${activeStarIdx + 1}/7: ${activeStar.name.toUpperCase()}]: ĐANG NẠP ĐẦY NĂNG LƯỢNG VŨ TRỤ...`,
        '#fde047',
        cx,
        height - 35
      );
    } else {
      drawBannerText(
        ctx,
        `☄️ [${activeStar.name.toUpperCase()} NẠP XONG]: LAO XUỐNG SÀN ĐẤU (5.000 DMG) -> CHUẨN BỊ SAO KẾ TIẾP!`,
        '#f97316',
        cx,
        height - 35
      );
    }
  } else if (cs.skillKey === 'ss05_tesseract') {
    // ----------------------------------------------------------------
    // SS-05: TESSERACT (4D HYPERCUBE & SPACETIME RIFT)
    // 1. Direct to Milky Way 4D hypercube moving (0-2000ms)
    // 2. Opens dimensional rift over arena (2000-3600ms)
    // 3. Emerges, rotates, aligns perpendicular (3600-5000ms)
    // 4. Plunges to arena (5000-6500ms)
    // ----------------------------------------------------------------
    if (elapsed < 2000) {
      // Moving 4D Hypercube in Milky Way Galaxy
      drawGalacticDust(ctx, width, height, now);
      drawStellarTesseractObject(ctx, cx, cy, 75, now * 0.002, 0.3, now);

      drawBannerText(ctx, '💠 [SS-05: TESSERACT] - SIÊU LẬP PHƯƠNG 4D TRONG DẢI NGÂN HÀ...', '#06b6d4', cx, height - 35);
    } else if (elapsed < 3600) {
      // Opening Hyperspace Rift right over arena
      drawGalacticDust(ctx, width, height, now);

      // Dimensional Wormhole / Rift
      const riftPulse = Math.sin(now * 0.015) * 8;
      const riftGrad = ctx.createRadialGradient(cx, cy - 25, 10, cx, cy - 25, 95 + riftPulse);
      riftGrad.addColorStop(0, '#ffffff');
      riftGrad.addColorStop(0.3, '#38bdf8');
      riftGrad.addColorStop(0.7, '#8b5cf6');
      riftGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = riftGrad;
      ctx.beginPath();
      ctx.arc(cx, cy - 25, 95 + riftPulse, 0, Math.PI * 2);
      ctx.fill();

      // Rift event horizon ring
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy - 25, 55 + riftPulse * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      drawBannerText(ctx, '🌀 MỞ CỔNG KHÔNG GIAN SIÊU CHIỀU TRÊN ĐỈNH ĐẤU TRƯỜNG...', '#a855f7', cx, height - 35);
    } else if (elapsed < 5000) {
      // Tesseract emerges, rotates, balances perpendicular
      const t = (elapsed - 3600) / 1400;
      // Portal background
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.beginPath();
      ctx.arc(cx, cy - 25, 110, 0, Math.PI * 2);
      ctx.fill();

      // Rotates then slows down to perpendicular alignment
      const rot = t < 0.7 ? now * 0.003 : 0; // locks to 0 (perpendicular) at end!
      drawStellarTesseractObject(ctx, cx, cy - 25, 80, rot, 1.0, now);

      drawBannerText(ctx, '📐 TESSERACT CÂN BẰNG VUÔNG GÓC HOÀN HẢO...', '#38bdf8', cx, height - 35);
    } else {
      // Plunging down to arena
      const plungeT = Math.min(1, (elapsed - 5000) / 1500);
      const curY = (cy - 25) + plungeT * (height * 0.6);
      drawStellarTesseractObject(ctx, cx, curY, 85 + plungeT * 20, 0, 1.0, now);

      drawBannerText(ctx, '⚡ LAO XUỐNG PHÌNH TO NỔ 5 LẦN (6.500 DMG) & NỔ HỦY DIỆT (20.000 DMG)!', '#06b6d4', cx, height - 35);
    }
  }

  ctx.restore();
}

// Banner label on bottom of cutscene
function drawBannerText(ctx: CanvasRenderingContext2D, text: string, color: string, cx: number, y: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(3, 7, 18, 0.88)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  const tw = ctx.measureText(text).width + 36;
  ctx.beginPath();
  ctx.roundRect(cx - tw / 2, y - 16, tw, 30, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, y);
  ctx.restore();
}

// Helper to draw Jupiter planet
function drawJupiter(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, rot: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  // Atmospheric base
  const jGrad = ctx.createRadialGradient(-radius * 0.3, -radius * 0.3, 10, 0, 0, radius);
  jGrad.addColorStop(0, '#fef08a');
  jGrad.addColorStop(0.35, '#f59e0b');
  jGrad.addColorStop(0.7, '#b45309');
  jGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = jGrad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Swirling gas bands
  ctx.save();
  ctx.clip();
  const bands = [-0.65, -0.4, -0.15, 0.1, 0.35, 0.6];
  bands.forEach((bY, idx) => {
    ctx.fillStyle = idx % 2 === 0 ? 'rgba(120, 53, 15, 0.45)' : 'rgba(254, 240, 138, 0.35)';
    ctx.fillRect(-radius, bY * radius, radius * 2, radius * 0.22);
  });

  // Great Red Spot
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.ellipse(radius * 0.25, radius * 0.22, radius * 0.22, radius * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

// Helper to draw 3D Tungsten Rotary Penetrator Drill (Mũi Khoan Tungsten Siêu Cường 3D)
export function draw3DTungstenDrill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  longitudinalRot: number,
  scale = 1.0,
  tiltAngle = 0,
  isPlunging = false,
  now = 0
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tiltAngle);
  ctx.scale(scale, scale);

  // If plunging at hypersonic speed, draw supersonic Mach shockwave cones & spiral vortex behind drill
  if (isPlunging) {
    // 1. Supersonic conical Mach shockwaves
    for (let s = 1; s <= 4; s++) {
      const sProgress = ((now * 0.0035 + s * 0.25) % 1);
      const sY = -60 - sProgress * 80;
      const sRadius = 25 + sProgress * 85;
      const sAlpha = (1 - sProgress) * 0.75;
      ctx.strokeStyle = `rgba(249, 115, 22, ${sAlpha})`;
      ctx.lineWidth = 3 * (1 - sProgress);
      ctx.beginPath();
      ctx.ellipse(0, sY, sRadius, sRadius * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 2. Helical plasma vortex ribbons winding backwards
    for (let ribbon = 0; ribbon < 2; ribbon++) {
      const rOffset = ribbon * Math.PI;
      ctx.strokeStyle = ribbon === 0 ? 'rgba(255, 237, 213, 0.85)' : 'rgba(249, 115, 22, 0.75)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let step = 0; step < 26; step++) {
        const vY = 55 - step * 6;
        const vRad = 14 + step * 1.9;
        const vAng = longitudinalRot * 3 + step * 0.35 + rOffset;
        const vX = Math.cos(vAng) * vRad;
        if (step === 0) ctx.moveTo(vX, vY);
        else ctx.lineTo(vX, vY);
      }
      ctx.stroke();
    }
  }

  // 3D Drill Body dimensions:
  // Tip at y = 65 (pointing downward to arena)
  // Base at y = -65 (rear propulsion collar)
  const tipY = 65;
  const baseY = -65;

  // 3. Rear Propulsion & Thruster Collar
  const collarGrad = ctx.createLinearGradient(-18, 0, 18, 0);
  collarGrad.addColorStop(0, '#0f172a');
  collarGrad.addColorStop(0.3, '#334155');
  collarGrad.addColorStop(0.7, '#64748b');
  collarGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = collarGrad;
  ctx.beginPath();
  ctx.roundRect(-16, baseY - 12, 32, 16, 4);
  ctx.fill();
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Cooling fins on collar
  for (let f = -12; f <= 12; f += 6) {
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(f, baseY - 12);
    ctx.lineTo(f, baseY + 4);
    ctx.stroke();
  }

  // 4. Base Conical Taper Outline (Solid Tungsten Heavy Body)
  // Cylindrical 3D lighting: gradient from dark gunmetal to bright highlight to shadow
  const bodyGrad = ctx.createLinearGradient(-22, 0, 22, 0);
  bodyGrad.addColorStop(0, '#05070a');
  bodyGrad.addColorStop(0.25, '#1e293b');
  bodyGrad.addColorStop(0.55, '#475569');
  bodyGrad.addColorStop(0.75, '#cbd5e1');
  bodyGrad.addColorStop(0.9, '#334155');
  bodyGrad.addColorStop(1, '#090d16');

  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(0, tipY); // Sharp chisel tip
  ctx.lineTo(20, baseY + 10);
  ctx.lineTo(-20, baseY + 10);
  ctx.closePath();
  ctx.fill();

  // 5. Helical Spiral Flutes (Rãnh xoắn kép Archimedes)
  // As longitudinalRot advances, the spiral grooves sweep continuously along the body!
  const numFlutes = 2; // Dual spiral drill bit
  for (let f = 0; f < numFlutes; f++) {
    const flutePhase = f * Math.PI;

    // Draw the spiral groove (rãnh xoắn thoát phôi)
    const slices = 45;
    ctx.beginPath();
    let started = false;

    for (let i = 0; i <= slices; i++) {
      const t = i / slices; // 0 at base, 1 at tip
      const curY = (baseY + 10) + t * (tipY - (baseY + 10));
      const currentRadius = 19 * (1 - t * 0.92);

      // Angle of this flute at height curY:
      const theta = longitudinalRot * 3.5 + t * Math.PI * 5 + flutePhase;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);

      if (cosT > -0.25) {
        const xOffset = sinT * currentRadius;
        if (!started) {
          ctx.moveTo(xOffset, curY);
          started = true;
        } else {
          ctx.lineTo(xOffset, curY);
        }
      } else {
        started = false;
      }
    }

    // Groove shadow & magma glow
    ctx.strokeStyle = '#020408';
    ctx.lineWidth = 5.5 * scale;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Hot glowing friction vein inside groove
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    // Specular cutting edge ridge right beside the groove
    ctx.beginPath();
    started = false;
    for (let i = 0; i <= slices; i++) {
      const t = i / slices;
      const curY = (baseY + 10) + t * (tipY - (baseY + 10));
      const currentRadius = 20 * (1 - t * 0.9);
      const theta = longitudinalRot * 3.5 + t * Math.PI * 5 + flutePhase + 0.35;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);

      if (cosT > 0.05) {
        const xOffset = sinT * currentRadius;
        if (!started) {
          ctx.moveTo(xOffset, curY);
          started = true;
        } else {
          ctx.lineTo(xOffset, curY);
        }
      } else {
        started = false;
      }
    }
    // Bright metallic titanium/tungsten highlight
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2 * scale;
    ctx.stroke();
  }

  // 6. Faceted Chisel Tip (Lưỡi cắt đa diện đầu mũi khoan)
  const tipAngle = (longitudinalRot * 3.5) % Math.PI;
  const tipGlint = Math.abs(Math.sin(tipAngle));
  ctx.fillStyle = tipGlint > 0.7 ? '#ffffff' : '#f97316';
  ctx.beginPath();
  ctx.moveTo(0, tipY + 4);
  ctx.lineTo(4, tipY - 8);
  ctx.lineTo(-4, tipY - 8);
  ctx.closePath();
  ctx.fill();

  // White-hot incandescent plasma friction point at the apex
  const tipGlow = ctx.createRadialGradient(0, tipY, 1, 0, tipY, 22);
  tipGlow.addColorStop(0, '#ffffff');
  tipGlow.addColorStop(0.3, '#fde047');
  tipGlow.addColorStop(0.65, '#f97316');
  tipGlow.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = tipGlow;
  ctx.beginPath();
  ctx.arc(0, tipY, 22, 0, Math.PI * 2);
  ctx.fill();

  // 7. Dynamic sparks flying from rotating drill flutes
  if (isPlunging) {
    for (let sp = 0; sp < 8; sp++) {
      const spAng = (longitudinalRot * 4 + sp * 0.8) % (Math.PI * 2);
      const spDist = 18 + ((now * 0.2 + sp * 7) % 35);
      const spY = tipY - ((now * 0.15 + sp * 12) % 65);
      ctx.fillStyle = sp % 2 === 0 ? '#ffffff' : '#fbbf24';
      ctx.beginPath();
      ctx.arc(Math.cos(spAng) * spDist, spY, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

// Backward-compatible alias
function drawTungstenArrow(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, scale = 1.0) {
  draw3DTungstenDrill(ctx, x, y, angle, scale, 0, true, performance.now());
}

// Helper to draw Galactic Dust
function drawGalacticDust(ctx: CanvasRenderingContext2D, width: number, height: number, now: number) {
  const gGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.6);
  gGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  gGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
  gGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gGrad;
  ctx.fillRect(0, 0, width, height);
}

// Helper to draw Tesseract 4D Hypercube
export function drawStellarTesseractObject(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rot: number,
  glowAlpha = 1.0,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);

  const innerSize = size * 0.52;
  const pulse = Math.sin(now * 0.008) * 4;

  // Outer Cube
  ctx.strokeStyle = `rgba(6, 182, 212, ${glowAlpha})`;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(-size / 2 - pulse, -size / 2 - pulse, size + pulse * 2, size + pulse * 2);

  // Inner Cube
  ctx.strokeStyle = `rgba(168, 85, 247, ${glowAlpha})`;
  ctx.lineWidth = 2;
  ctx.strokeRect(-innerSize / 2, -innerSize / 2, innerSize, innerSize);

  // Connecting 4D Projection Edges (8 vertices)
  const oHalf = size / 2 + pulse;
  const iHalf = innerSize / 2;
  ctx.strokeStyle = `rgba(244, 63, 94, ${glowAlpha * 0.8})`;
  ctx.lineWidth = 1.5;

  const corners = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ];
  ctx.beginPath();
  corners.forEach(([sx, sy]) => {
    ctx.moveTo(sx * oHalf, sy * oHalf);
    ctx.lineTo(sx * iHalf, sy * iHalf);
  });
  ctx.stroke();

  // Central glowing singularity core
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Helper to draw diving stellar meteor
function drawStellarMeteor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number,
  color: string,
  now: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Tail flame
  const grad = ctx.createLinearGradient(0, 0, -size * 3.5, 0);
  grad.addColorStop(0, color);
  grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.6)');
  grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.4);
  ctx.lineTo(-size * 3.5, 0);
  ctx.lineTo(0, size * 0.4);
  ctx.closePath();
  ctx.fill();

  // Glowing Star Core
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();
}

/**
 * Render SS-01 Continuous Orbital Railgun Beam in Arena (200 dmg/0.1s x 15s)
 */
export function drawStellarOrbitalBeam(
  ctx: CanvasRenderingContext2D,
  beam: StellarOrbitalBeamState,
  now: number
) {
  if (!beam.active) return;
  const { targetX, targetY } = beam;

  ctx.save();
  // Vertical column from sky (y=0) to target point
  const beamWidth = 38 + Math.sin(now * 0.05) * 6;

  // Outer red glow
  ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
  ctx.fillRect(targetX - beamWidth, 0, beamWidth * 2, targetY);

  // Mid crimson energy
  ctx.fillStyle = 'rgba(248, 113, 113, 0.85)';
  ctx.fillRect(targetX - beamWidth * 0.5, 0, beamWidth, targetY);

  // Pure white lightspeed core
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(targetX - 4, 0, 8, targetY);

  // Ground Impact Scorch & Plasma Flare
  const flareRadius = 32 + Math.sin(now * 0.04) * 8;
  const fGrad = ctx.createRadialGradient(targetX, targetY, 4, targetX, targetY, flareRadius);
  fGrad.addColorStop(0, '#ffffff');
  fGrad.addColorStop(0.4, '#ef4444');
  fGrad.addColorStop(0.8, '#f97316');
  fGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = fGrad;
  ctx.beginPath();
  ctx.arc(targetX, targetY, flareRadius, 0, Math.PI * 2);
  ctx.fill();

  // Concentric shock rings at base
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(targetX, targetY, flareRadius * 0.75, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Render SS-03 Tsar Bomba Cataclysmic Nuclear Blast
 */
export function drawStellarTsarExplosion(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  progress: number, // 0..1
  now: number
) {
  ctx.save();
  const maxR = 260;
  const curR = 15 + progress * maxR;
  const alpha = Math.max(0, 1 - progress);

  // Blinding Core
  const blastGrad = ctx.createRadialGradient(x, y, 5, x, y, curR);
  blastGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  blastGrad.addColorStop(0.25, `rgba(254, 240, 138, ${alpha})`);
  blastGrad.addColorStop(0.55, `rgba(249, 115, 22, ${alpha * 0.85})`);
  blastGrad.addColorStop(0.85, `rgba(220, 38, 38, ${alpha * 0.6})`);
  blastGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = blastGrad;
  ctx.beginPath();
  ctx.arc(x, y, curR, 0, Math.PI * 2);
  ctx.fill();

  // Supersonic shock rings
  ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.lineWidth = 6 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 1.15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
  ctx.lineWidth = 4 * alpha;
  ctx.beginPath();
  ctx.arc(x, y, curR * 0.85, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}
