from PIL import Image, ImageDraw, ImageFont
import os

# Path to the downloaded font file
font_path = "NotoSansDevanagari-Regular.ttf"  # Ensure this file is in the same directory
output_folder = "hindi_alphabet_images/"

# List of Hindi alphabets (vowels + consonants)
hindi_alphabets = [
    "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
    "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
    "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
    "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व",
    "श", "ष", "स", "ह", "क्ष", "त्र", "ज्ञ", "श्र",
    "ड़", "ढ़"
]

# Create output folder if not exists
os.makedirs(output_folder, exist_ok=True)

# Generate images for each letter
for i, letter in enumerate(hindi_alphabets, start=1):
    img_size = (200, 200)
    img = Image.new("RGB", img_size, (255, 255, 255))  # White background
    draw = ImageDraw.Draw(img)

    try:
        font = ImageFont.truetype(font_path, 100)  # Adjust font size as needed
    except IOError:
        print("Font file not found! Place the .ttf file in the script directory.")
        break

    # Get text bounding box
    text_bbox = draw.textbbox((0, 0), letter, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]

    # Center the text properly
    x = (img_size[0] - text_width) // 2 - text_bbox[0]
    y = (img_size[1] - text_height) // 2 - text_bbox[1]

    # Draw text with Deep Purple color (#673AB7)
    draw.text((x, y), letter, font=font, fill="#673AB7")  

    # Save image with sequential numbering
    img_path = os.path.join(output_folder, f"letter_{i}.png")
    img.save(img_path)

print("Images generated successfully in the 'hindi_alphabet_images' folder!")
