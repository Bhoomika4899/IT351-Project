from gtts import gTTS
import os

# Hindi alphabets (vowels + consonants)
hindi_alphabets = [
  "अनार", "आम", "इमली", "ईख", "उल्लू", "ऊन", "ऋषि", "एड़ी", "ऐनक", "ओखली",  
  "औरत", "अंगूर", "नमः", "कलम", "खरगोश", "गमला", "घड़ी", "ङील", "चम्मच", "छाता",  
  "जलेबी", "झरना", "ज्ञान", "टमाटर", "ठेला", "डमरू", "ढोल", "वाण", "तरबूज", "थाली",  
  "दरवाजा", "धनुष", "नल", "पतंग", "फल", "बतख", "भालू", "मछली", "यज्ञ", "रथ",  
  "लड्डू", "वजन", "शेर", "षट्कोण", "साबुन", "हाथी", "क्षत्रिय", "त्रिशूल", "ज्ञान", "श्रमिक", "पेड़", "ढक्कन"
]

# Create a folder to save files
folder_name = "hindi_word_audio"
os.makedirs(folder_name, exist_ok=True)

# Generate MP3 for each alphabet
for idx, letter in enumerate(hindi_alphabets):
    tts = gTTS(text=letter, lang='hi')
    filename = os.path.join(folder_name, f"hindi_word_{idx+1}.mp3")
    tts.save(filename)
    print(f"Saved: {filename}")

print("All audio files are generated and saved in the folder!")
