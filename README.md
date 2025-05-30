# 🚀 Alibaba Kabi Mega Platforma

Bu loyiha 6 ta zamonaviy arxitektura tamoyiliga asoslangan:

## 📁 Papka Tuzilmasi

```
newwsayt/
│
├── mikrokernel-yadro/          # 🔹 MIKROKERNEL - asosiy minimal yadro
│   ├── servis-royxati/         # Barcha servislar ro'yxati
│   └── xabar-magistral/        # Servislar orasida aloqa
│
├── mikroservislar/             # 🔹 Har bir funksiya alohida servis
│   ├── foydalanuvchi-servisi/
│   │   ├── biznes-logika/      # 🔸 HEXAGONAL + DDD - biznes qoidalari
│   │   ├── tashqi-qatlam/      # 🔸 HEXAGONAL - DB, API bog'lanishlar
│   │   ├── buyruqlar/          # 🔸 CQRS - o'zgartirish buyruqlari
│   │   ├── sorovlar/           # 🔸 CQRS - o'qish so'rovlari
│   │   └── serverless-bulut/   # 🔸 SERVERLESS - avtomatik masshtab
│   │
│   ├── mahsulot-servisi/       # Mahsulotlar bilan ishlash
│   ├── buyurtma-servisi/       # Buyurtmalarni boshqarish
│   └── tolov-servisi/          # To'lovlarni qayta ishlash
│
├── voqealar-ombori/            # 🔸 EVENT SOURCING - barcha voqealar
│   ├── foydalanuvchi-voqealari/
│   ├── buyurtma-voqealari/
│   └── tolov-voqealari/
│
├── asinxron-xabarlar/          # 🔸 REACTIVE - real-time xabarlar
│   ├── kafka-oqimlari/         # Asinxron xabar oqimlari
│   └── websocket-aloqa/        # Jonli yangilanishlar
│
└── bulut-funksiyalar/          # 🔸 SERVERLESS - mustaqil funksiyalar
    ├── rasm-qayta-ishlash/     # Rasmlarni optimallashtirish
    ├── hisobot-yaratish/       # PDF, Excel hisobotlar
    └── xabarnoma-yuborish/     # SMS, Email xabarnomalar
```

## 🎯 Arxitektura Tamoyillari

1. **Mikrokernel** - Minimal yadro + kengaytmalar
2. **Hexagonal** - Biznes logika markazda, tashqi dunyodan ajratilgan
3. **DDD** - Real biznes tushunchalari kodda
4. **CQRS + Event Sourcing** - O'qish/Yozish ajratilgan + voqealar tarixi
5. **Reactive** - Asinxron xabarlar orqali yuqori tezlik
6. **Serverless** - Avtomatik masshtab va yuqori mavjudlik

## 🛠️ Texnologiyalar

- **Backend:** Node.js, Express
- **Database:** PostgreSQL (yozish), MongoDB (o'qish)
- **Xabar tizimi:** Apache Kafka
- **Serverless:** AWS Lambda, Vercel
- **Container:** Docker, Kubernetes

## 🚀 Boshlash

```bash
# Loyihani klonlash
git clone https://github.com/sizning-repo/alibaba-platforma.git

# Asosiy papkaga kirish
cd newwsayt

# Kerakli paketlarni o'rnatish
npm install

# Mikroservislarni ishga tushirish
docker-compose up
```

## 📈 Kengayish Rejasi

1. **Boshlang'ich:** 3-5 mikroservis
2. **O'rta:** 10-15 mikroservis + Kafka
3. **Katta:** 50+ mikroservis + Multi-region

---
*O'zbek tilida yozilgan zamonaviy platforma* 🇺🇿 