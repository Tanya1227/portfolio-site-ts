import os, math, shutil
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 800

# Color palette matching site design system
C_PINK_BG = (253, 244, 248)
C_PURPLE_BG = (243, 232, 255)
C_BLUE_BG = (239, 246, 255)

C_PURPLE_PRIMARY = (107, 33, 168)    # #6B21A8
C_PURPLE_LIGHT = (139, 92, 246)     # #8B5CF6
C_PURPLE_CHIP = (243, 232, 255)      # #F3E8FF
C_PINK_CHIP = (253, 226, 243)        # #FDE2F3
C_BLUE_CHIP = (224, 231, 255)        # #E0E7FF

C_TEXT_DARK = (55, 65, 81)           # #374151
C_TEXT_MAIN = (31, 41, 55)           # #1F2937
C_TEXT_MUTED = (107, 114, 128)       # #6B7280

C_CARD_BG = (255, 255, 255)
C_BORDER = (229, 231, 235)
C_GREEN = (16, 185, 129)
C_GREEN_BG = (209, 250, 229)

def draw_background(draw):
    for y in range(H):
        t = y / H
        if t < 0.5:
            f = t * 2
            r = int(C_PINK_BG[0]*(1-f) + C_PURPLE_BG[0]*f)
            g = int(C_PINK_BG[1]*(1-f) + C_PURPLE_BG[1]*f)
            b = int(C_PINK_BG[2]*(1-f) + C_PURPLE_BG[2]*f)
        else:
            f = (t - 0.5) * 2
            r = int(C_PURPLE_BG[0]*(1-f) + C_BLUE_BG[0]*f)
            g = int(C_PURPLE_BG[1]*(1-f) + C_BLUE_BG[1]*f)
            b = int(C_PURPLE_BG[2]*(1-f) + C_BLUE_BG[2]*f)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

def draw_browser_frame(draw, x=70, y=50, w=1060, h=700):
    # Outer soft drop shadow
    draw.rounded_rectangle([x-8, y-4, x+w+8, y+h+12], radius=24, fill=(215, 220, 235))
    draw.rounded_rectangle([x-3, y-1, x+w+3, y+h+4], radius=20, fill=(230, 234, 245))
    # Main browser card container
    draw.rounded_rectangle([x, y, x+w, y+h], radius=16, fill=(255, 255, 255), outline=(229, 231, 235), width=1)
    # Header bar
    draw.rounded_rectangle([x, y, x+w, y+46], radius=16, fill=(249, 250, 251))
    draw.rectangle([x, y+30, x+w, y+46], fill=(249, 250, 251))
    draw.line([(x, y+46), (x+w, y+46)], fill=(229, 231, 235), width=1)
    # Window controls
    draw.ellipse([x+18, y+17, x+30, y+29], fill=(248, 113, 113))
    draw.ellipse([x+38, y+17, x+50, y+29], fill=(251, 191, 36))
    draw.ellipse([x+58, y+17, x+70, y+29], fill=(52, 211, 153))
    # Address bar pill
    draw.rounded_rectangle([x+160, y+11, x+w-160, y+35], radius=8, fill=(243, 244, 246), outline=(229, 231, 235), width=1)

# Generate Project 1: 7Seers.ai
def gen_7seers():
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    draw_background(draw)
    draw_browser_frame(draw)
    
    x, y, w, h = 70, 50, 1060, 700
    cx, cy = x + 20, y + 66
    
    # Left Navigation Sidebar
    draw.rounded_rectangle([cx, cy, cx+200, y+h-20], radius=12, fill=(249, 250, 251), outline=C_BORDER, width=1)
    # Sidebar active pill
    draw.rounded_rectangle([cx+12, cy+16, cx+188, cy+52], radius=8, fill=C_PURPLE_PRIMARY)
    # Sidebar items
    for i in range(4):
        iy = cy + 70 + i * 44
        draw.rounded_rectangle([cx+12, iy, cx+188, iy+36], radius=8, fill=(243, 244, 246) if i > 0 else C_PURPLE_PRIMARY)

    # Main Dashboard Body (Right of Sidebar)
    bx = cx + 220
    bw = w - 260
    
    # Top Banner Card - Active Session
    draw.rounded_rectangle([bx, cy, bx+bw, cy+90], radius=14, fill=C_PURPLE_CHIP, outline=(221, 214, 254), width=1)
    draw.rounded_rectangle([bx+16, cy+16, bx+140, cy+40], radius=12, fill=C_PURPLE_PRIMARY)
    draw.rounded_rectangle([bx+16, cy+52, bx+bw-16, cy+72], radius=6, fill=(255, 255, 255))
    
    # Grid Content: Video Avatar Card (Left) & Performance Feedback (Right)
    grid_y = cy + 110
    card_w = (bw - 20) // 2
    
    # Video Avatar Card
    draw.rounded_rectangle([bx, grid_y, bx+card_w, grid_y+260], radius=14, fill=(249, 250, 251), outline=(216, 180, 254), width=2)
    # Video screen mock inside
    draw.rounded_rectangle([bx+16, grid_y+16, bx+card_w-16, grid_y+200], radius=12, fill=(243, 244, 246))
    draw.ellipse([bx+card_w//2-30, grid_y+70, bx+card_w//2+30, grid_y+130], fill=C_PURPLE_LIGHT)
    # Live Waveform
    for k in range(15):
        wx = bx + 30 + k * 18
        wh = abs(int(25 * math.sin(k * 0.7))) + 5
        draw.rounded_rectangle([wx, grid_y+230-wh, wx+8, grid_y+230], radius=3, fill=C_PURPLE_PRIMARY)
        
    # Performance Feedback Card (Right)
    draw.rounded_rectangle([bx+card_w+20, grid_y, bx+bw, grid_y+260], radius=14, fill=(255, 255, 255), outline=C_BORDER, width=1)
    # Response Score Radial Gauge Mock
    draw.ellipse([bx+card_w+60, grid_y+30, bx+card_w+200, grid_y+170], outline=C_PURPLE_LIGHT, width=12)
    draw.ellipse([bx+card_w+60, grid_y+30, bx+card_w+200, grid_y+170], outline=C_PURPLE_PRIMARY, width=12)
    # Metric Bars below gauge
    for m, (lbl, val) in enumerate([("Clarity", 0.92), ("Pace", 0.85), ("Confidence", 0.88)]):
        my = grid_y + 185 + m * 22
        draw.rounded_rectangle([bx+card_w+40, my, bx+bw-40, my+14], radius=7, fill=(243, 244, 246))
        draw.rounded_rectangle([bx+card_w+40, my, bx+card_w+40+int((bw-80)*val), my+14], radius=7, fill=C_PURPLE_PRIMARY)
        
    # Bottom Action Bar
    bot_y = grid_y + 280
    draw.rounded_rectangle([bx, bot_y, bx+bw, bot_y+160], radius=14, fill=C_PINK_CHIP, outline=(244, 210, 235), width=1)
    draw.rounded_rectangle([bx+20, bot_y+20, bx+180, bot_y+56], radius=20, fill=C_PURPLE_PRIMARY)
    draw.rounded_rectangle([bx+200, bot_y+20, bx+360, bot_y+56], radius=20, fill=(255, 255, 255), outline=C_PURPLE_PRIMARY, width=1)
    
    return img

# Generate Project 2: EquipNet
def gen_equipnet():
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    draw_background(draw)
    draw_browser_frame(draw)
    
    x, y, w, h = 70, 50, 1060, 700
    cx, cy = x + 20, y + 66
    
    # Top Search & Filter Bar
    draw.rounded_rectangle([cx, cy, cx+w-40, cy+64], radius=14, fill=(249, 250, 251), outline=C_BORDER, width=1)
    draw.rounded_rectangle([cx+16, cy+12, cx+400, cy+52], radius=10, fill=(255, 255, 255), outline=C_BORDER, width=1)
    draw.rounded_rectangle([cx+420, cy+12, cx+580, cy+52], radius=10, fill=C_PURPLE_CHIP, outline=(216, 180, 254), width=1)
    draw.rounded_rectangle([cx+600, cy+12, cx+760, cy+52], radius=10, fill=C_BLUE_CHIP)

    # Split View: Map Panel (Left 45%) & Equipment Cards (Right 55%)
    body_y = cy + 80
    map_w = 440
    cards_w = w - 40 - map_w - 20
    cards_x = cx + map_w + 20
    
    # Map Panel Mock
    draw.rounded_rectangle([cx, body_y, cx+map_w, y+h-20], radius=14, fill=(240, 244, 248), outline=C_BORDER, width=1)
    # Map Roads
    draw.line([(cx+40, body_y+50), (cx+map_w-40, body_y+200)], fill=(203, 213, 225), width=6)
    draw.line([(cx+100, body_y+350), (cx+map_w-20, body_y+100)], fill=(203, 213, 225), width=6)
    draw.line([(cx+60, body_y+100), (cx+map_w-60, body_y+400)], fill=(203, 213, 225), width=4)
    # Location Pins
    pins = [(cx+120, body_y+90), (cx+260, body_y+180), (cx+340, body_y+110), (cx+180, body_y+320), (cx+320, body_y+380)]
    for px, py in pins:
        draw.ellipse([px-14, py-14, px+14, py+14], fill=C_PURPLE_PRIMARY)
        draw.ellipse([px-6, py-6, px+6, py+6], fill=(255, 255, 255))
        
    # Equipment Cards Grid (3 Equipment items)
    for i, (title, price, avbl) in enumerate([
        ("Philips Respironics Ventilator", "$180 / day", True),
        ("GE Healthcare MRI Scanner", "$450 / day", False),
        ("Stryker Patient Monitor", "$65 / day", True)
    ]):
        card_y = body_y + i * 175
        draw.rounded_rectangle([cards_x, card_y, cards_x+cards_w, card_y+160], radius=14, fill=(255, 255, 255), outline=C_BORDER, width=1)
        # Image placeholder square inside card
        draw.rounded_rectangle([cards_x+16, card_y+16, cards_x+140, card_y+144], radius=10, fill=C_PURPLE_CHIP)
        draw.ellipse([cards_x+58, card_y+60, cards_x+98, card_y+100], fill=C_PURPLE_PRIMARY)
        
        # Details
        draw.rounded_rectangle([cards_x+160, card_y+20, cards_x+360, card_y+40], radius=6, fill=(243, 244, 246))
        # Availability Badge
        badge_col = C_GREEN_BG if avbl else (254, 243, 199)
        draw.rounded_rectangle([cards_x+160, card_y+52, cards_x+250, card_y+76], radius=12, fill=badge_col)
        # Rent Button
        draw.rounded_rectangle([cards_x+cards_w-130, card_y+104, cards_x+cards_w-16, card_y+144], radius=10, fill=C_PURPLE_PRIMARY)

    return img

# Generate Project 3: Reusable Component & API Systems
def gen_components():
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    draw_background(draw)
    draw_browser_frame(draw)
    
    x, y, w, h = 70, 50, 1060, 700
    cx, cy = x + 20, y + 66
    
    # Left Navigation Pane (Storybook Explorer)
    draw.rounded_rectangle([cx, cy, cx+220, y+h-20], radius=14, fill=(249, 250, 251), outline=C_BORDER, width=1)
    draw.rounded_rectangle([cx+12, cy+16, cx+208, cy+46], radius=8, fill=C_PURPLE_CHIP, outline=(216, 180, 254), width=1)
    for i in range(7):
        iy = cy + 64 + i * 40
        draw.rounded_rectangle([cx+12, iy, cx+208, iy+32], radius=6, fill=C_PURPLE_PRIMARY if i==0 else (243, 244, 246))

    # Center Component Preview Canvas
    cw = 420
    cx_center = cx + 240
    draw.rounded_rectangle([cx_center, cy, cx_center+cw, y+h-20], radius=14, fill=(255, 255, 255), outline=C_BORDER, width=1)
    
    # Buttons Section
    draw.rounded_rectangle([cx_center+20, cy+20, cx_center+cw-20, cy+180], radius=12, fill=(249, 250, 251), outline=C_BORDER, width=1)
    draw.rounded_rectangle([cx_center+40, cy+45, cx_center+200, cy+85], radius=20, fill=C_PURPLE_PRIMARY)
    draw.rounded_rectangle([cx_center+220, cy+45, cx_center+360, cy+85], radius=20, fill=(255, 255, 255), outline=C_PURPLE_PRIMARY, width=2)
    draw.rounded_rectangle([cx_center+40, cy+105, cx_center+160, cy+145], radius=20, fill=C_PINK_CHIP)
    draw.rounded_rectangle([cx_center+180, cy+105, cx_center+320, cy+145], radius=20, fill=C_BLUE_CHIP)

    # Badges & Switches Section
    draw.rounded_rectangle([cx_center+20, cy+200, cx_center+cw-20, cy+360], radius=12, fill=(249, 250, 251), outline=C_BORDER, width=1)
    # Chips
    for ch, col in enumerate([C_PURPLE_CHIP, C_PINK_CHIP, C_BLUE_CHIP, C_GREEN_BG]):
        draw.rounded_rectangle([cx_center+40 + (ch%2)*160, cy+225 + (ch//2)*50, cx_center+180 + (ch%2)*160, cy+260 + (ch//2)*50], radius=14, fill=col)
    # Toggle Switches
    draw.rounded_rectangle([cx_center+40, cy+320, cx_center+90, cy+346], radius=13, fill=C_PURPLE_PRIMARY)
    draw.ellipse([cx_center+66, cy+322, cx_center+88, cy+344], fill=(255, 255, 255))
    draw.rounded_rectangle([cx_center+120, cy+320, cx_center+170, cy+346], radius=13, fill=(209, 213, 219))
    draw.ellipse([cx_center+122, cy+322, cx_center+144, cy+344], fill=(255, 255, 255))

    # Input Controls Section
    draw.rounded_rectangle([cx_center+20, cy+380, cx_center+cw-20, y+h-40], radius=12, fill=(249, 250, 251), outline=C_BORDER, width=1)
    draw.rounded_rectangle([cx_center+40, cy+410, cx_center+cw-40, cy+450], radius=8, fill=(255, 255, 255), outline=C_PURPLE_LIGHT, width=2)

    # Right Code & API Inspector Pane
    rw = w - 40 - 220 - cw - 40
    rx = cx_center + cw + 20
    draw.rounded_rectangle([rx, cy, rx+rw, cy+280], radius=14, fill=(30, 41, 59))  # Dark editor code card
    for line in range(8):
        draw.rounded_rectangle([rx+20, cy+25+line*30, rx+60+(line*35)%180, cy+37+line*30], radius=4, fill=(148, 163, 184) if line%2==0 else C_PURPLE_LIGHT)

    # REST API State Inspector Card (Right Bottom)
    draw.rounded_rectangle([rx, cy+300, rx+rw, y+h-20], radius=14, fill=(255, 255, 255), outline=C_BORDER, width=1)
    draw.rounded_rectangle([rx+16, cy+320, rx+120, cy+344], radius=6, fill=C_GREEN_BG)
    draw.rounded_rectangle([rx+16, cy+360, rx+rw-16, cy+520], radius=8, fill=(249, 250, 251), outline=C_BORDER, width=1)

    return img

# Generate Project 4: AR/VR Learning Experience
def gen_arvr():
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    draw_background(draw)
    draw_browser_frame(draw)
    
    x, y, w, h = 70, 50, 1060, 700
    cx, cy = x + 20, y + 66
    bw, bh = w - 40, h - 86
    
    # Main 3D WebXR Viewport Container
    draw.rounded_rectangle([cx, cy, cx+bw, cy+bh], radius=14, fill=(245, 243, 255), outline=(216, 180, 254), width=2)
    
    # Perspective Grid Mesh Floor
    grid_cy = cy + bh // 2 + 40
    for i in range(-15, 16):
        draw.line([(cx+bw//2 + i*25, grid_cy), (cx+bw//2 + i*75, cy+bh)], fill=(196, 181, 253), width=1)
    for gy in range(grid_cy, cy+bh, 35):
        draw.line([(cx, gy), (cx+bw, gy)], fill=(196, 181, 253), width=1)
        
    # Floating 3D Holographic Geometry Mockups
    # 3D Cube (Center Left)
    kx, ky, ks = cx + 320, cy + 220, 100
    draw.rectangle([kx-ks//2, ky-ks//2, kx+ks//2, ky+ks//2], outline=C_PURPLE_PRIMARY, width=3)
    draw.rectangle([kx-ks//4, ky-ks//4, kx+ks//4, ky+ks//4], outline=C_PURPLE_LIGHT, width=2)
    draw.line([(kx-ks//2, ky-ks//2), (kx-ks//4, ky-ks//4)], fill=C_PURPLE_PRIMARY, width=2)
    draw.line([(kx+ks//2, ky-ks//2), (kx+ks//4, ky-ks//4)], fill=C_PURPLE_PRIMARY, width=2)
    draw.line([(kx-ks//2, ky+ks//2), (kx-ks//4, ky+ks//4)], fill=C_PURPLE_PRIMARY, width=2)
    draw.line([(kx+ks//2, ky+ks//2), (kx+ks//4, ky+ks//4)], fill=C_PURPLE_PRIMARY, width=2)
    
    # 3D Sphere Wireframe (Center Right)
    sx, sy, sr = cx + 680, cy + 210, 80
    draw.ellipse([sx-sr, sy-sr, sx+sr, sy+sr], outline=C_PURPLE_PRIMARY, width=3)
    draw.ellipse([sx-sr, sy-sr//3, sx+sr, sy+sr//3], outline=C_PURPLE_LIGHT, width=2)
    draw.ellipse([sx-sr//3, sy-sr, sx+sr//3, sy+sr], outline=C_PURPLE_LIGHT, width=2)

    # AR Surface Detection Indicator Pill (Top Center)
    draw.rounded_rectangle([cx+bw//2-180, cy+20, cx+bw//2+180, cy+60], radius=20, fill=(255, 255, 255), outline=C_PURPLE_PRIMARY, width=2)
    draw.ellipse([cx+bw//2-160, cy+33, cx+bw//2-146, cy+47], fill=C_GREEN)
    
    # Spatial Anchor Nodes
    for nx, ny in [(cx+260, cy+380), (cx+500, cy+420), (cx+740, cy+390)]:
        draw.ellipse([nx-16, ny-16, nx+16, ny+16], outline=C_PURPLE_PRIMARY, width=3)
        draw.ellipse([nx-6, ny-6, nx+6, ny+6], fill=C_PURPLE_LIGHT)

    # Bottom WebXR Toolbar Controls
    tb_y = cy + bh - 70
    draw.rounded_rectangle([cx+bw//2-240, tb_y, cx+bw//2+240, tb_y+50], radius=25, fill=(255, 255, 255), outline=C_BORDER, width=1)
    for b in range(4):
        bx = cx + bw//2 - 210 + b * 110
        draw.rounded_rectangle([bx, tb_y+8, bx+90, tb_y+42], radius=17, fill=C_PURPLE_PRIMARY if b==0 else C_PURPLE_CHIP)

    return img

# Generate Project 5: GitHub Time-Tracking Extension
def gen_github():
    img = Image.new('RGB', (W, H))
    draw = ImageDraw.Draw(img)
    draw_background(draw)
    draw_browser_frame(draw)
    
    x, y, w, h = 70, 50, 1060, 700
    cx, cy = x + 20, y + 66
    bw, bh = w - 40, h - 86
    
    # GitHub Page Mock Background (Clean light theme)
    draw.rounded_rectangle([cx, cy, cx+bw, cy+bh], radius=14, fill=(255, 255, 255), outline=C_BORDER, width=1)
    # GitHub Header Mock
    draw.rectangle([cx, cy, cx+bw, cy+50], fill=(246, 248, 250))
    draw.line([(cx, cy+50), (cx+bw, cy+50)], fill=C_BORDER, width=1)
    draw.rounded_rectangle([cx+20, cy+12, cx+140, cy+38], radius=6, fill=(209, 213, 219))
    
    # PR Title & Tabs
    draw.rounded_rectangle([cx+30, cy+70, cx+480, cy+95], radius=6, fill=(31, 41, 55))
    draw.rounded_rectangle([cx+30, cy+105, cx+120, cy+128], radius=12, fill=C_GREEN_BG)
    for tab in range(4):
        draw.rounded_rectangle([cx+140+tab*110, cy+105, cx+230+tab*110, cy+128], radius=6, fill=(243, 244, 246))

    # Issue content lines mock
    for line in range(6):
        draw.rounded_rectangle([cx+30, cy+160+line*35, cx+520-(line*25)%100, cy+180+line*35], radius=6, fill=(243, 244, 246))

    # Extension Modal Popup Overlay (Center-Right Floating Card)
    ex, ey, ew, eh = cx + 540, cy + 80, 460, 500
    # Soft drop shadow
    draw.rounded_rectangle([ex-8, ey-4, ex+ew+8, ey+eh+12], radius=20, fill=(200, 205, 220))
    draw.rounded_rectangle([ex, ey, ex+ew, ey+eh], radius=16, fill=(255, 255, 255), outline=C_PURPLE_LIGHT, width=2)
    
    # Extension Header
    draw.rounded_rectangle([ex, ey, ex+ew, ey+60], radius=16, fill=C_PURPLE_PRIMARY)
    draw.rectangle([ex, ey+44, ex+ew, ey+60], fill=C_PURPLE_PRIMARY)
    
    # Timer Display Pill
    draw.rounded_rectangle([ex+30, ey+80, ex+ew-30, ey+160], radius=14, fill=C_PURPLE_CHIP, outline=(216, 180, 254), width=1)
    # Pulsing Green Dot
    draw.ellipse([ex+50, ey+110, ex+70, ey+130], fill=C_GREEN)
    # Timer digits mock
    draw.rounded_rectangle([ex+90, ey+100, ex+ew-50, ey+140], radius=8, fill=(255, 255, 255))
    
    # Category Pills
    draw.rounded_rectangle([ex+30, ey+180, ex+160, ey+210], radius=12, fill=C_PINK_CHIP)
    draw.rounded_rectangle([ex+175, ey+180, ex+300, ey+210], radius=12, fill=C_BLUE_CHIP)
    
    # Weekly Activity Bar Chart
    draw.rounded_rectangle([ex+30, ey+230, ex+ew-30, ey+400], radius=12, fill=(249, 250, 251), outline=C_BORDER, width=1)
    bars = [45, 80, 60, 95, 70, 110, 85]
    for b_i, b_h in enumerate(bars):
        bx_pos = ex + 55 + b_i * 54
        draw.rounded_rectangle([bx_pos, ey+380-b_h, bx_pos+32, ey+380], radius=6, fill=C_PURPLE_PRIMARY if b_i==3 else C_PURPLE_LIGHT)

    # Action Buttons
    draw.rounded_rectangle([ex+30, ey+420, ex+ew//2-10, ey+470], radius=12, fill=C_PURPLE_PRIMARY)
    draw.rounded_rectangle([ex+ew//2+10, ey+420, ex+ew-30, ey+470], radius=12, fill=(255, 255, 255), outline=C_PURPLE_PRIMARY, width=2)

    return img

# Save all 5 images
brain_dir = '/Users/shubhodeepsen/.gemini/antigravity/brain/3a06d599-a161-405e-915e-4977901b89c6'
src_dir = '/Users/shubhodeepsen/Documents/Learning/iter8labs/portfolio-site-ts/frontend/src/assets'
public_dir = '/Users/shubhodeepsen/Documents/Learning/iter8labs/portfolio-site-ts/frontend/public/assets'

generators = [
    ('project-7seers-ai.jpg', gen_7seers),
    ('project-equipnet.jpg', gen_equipnet),
    ('project-reusable-component-api-systems.jpg', gen_components),
    ('project-arvr-learning-experience.jpg', gen_arvr),
    ('project-github-time-tracking-extension.jpg', gen_github),
]

for filename, func in generators:
    img = func()
    src_path = os.path.join(src_dir, filename)
    pub_path = os.path.join(public_dir, filename)
    brain_path = os.path.join(brain_dir, filename)
    
    img.save(src_path, 'JPEG', quality=95)
    shutil.copy(src_path, pub_path)
    shutil.copy(src_path, brain_path)
    print(f'Successfully generated: {filename}')

print('ALL 5 DESIGN SYSTEM PROJECT IMAGES GENERATED SUCCESSFULLY!')
