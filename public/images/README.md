# Folder untuk menyimpan gambar secara lokal (tanpa CDN)
#
# Cara pakai:
# 1. Taruh semua file gambar (.webp, .jpg, .png, dll) di folder ini
# 2. Di src/data/config.json, set:
#    "cdn_base_url": "/images"
#
# Daftar gambar yang dibutuhkan (sesuaikan nama file dengan config.json):
#   NIKAHFIX.webp       → images.logo
#   guest-icon.webp     → images.guest_icon
#   compsite-update.webp → images.cover
#   thumbnail.webp      → images.thumbnail
#   letter.webp         → images.letter / breaking_news_img
#   face.webp           → images.face
#   4k-icon.webp        → images.icon_4k
#   hd-icon.webp        → images.icon_hd
#   groom.webp          → pegantin.pria.foto
#   bride.webp          → pegantin.wanita.foto
#   story1-4.webp       → love_story[].image & images.card_backgrounds
#   meta.webp           → meta.og_image_path
