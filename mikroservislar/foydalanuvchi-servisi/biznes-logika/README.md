# Domain-Driven Design (DDD) Strukturasi

Bu papkada biznes logikasi DDD tamoyillariga asosan tashkil etiladi:

## 📁 Kerakli papkalar:

```
biznes-logika/
├── entities/              # Asosiy biznes obyektlari
│   ├── User.js           # Foydalanuvchi entity
│   └── UserProfile.js    # Profil entity
├── value-objects/         # O'zgarmas qiymat obyektlari
│   ├── Email.js          # Email value object
│   ├── PhoneNumber.js    # Telefon raqam
│   └── Password.js       # Parol
├── aggregates/           # Agregatlar
│   └── UserAggregate.js  # User agregati
├── repositories/         # Repository interfeyslari
│   └── UserRepository.js # User repository
└── services/             # Domain xizmatlari
    └── UserService.js    # User domain service
```

## 🎯 Har bir komponent vazifasi:

- **Entities** - ID ga ega, o'zgaruvchan obyektlar
- **Value Objects** - ID siz, o'zgarmas obyektlar
- **Aggregates** - Bog'liq entity'larni birlashtiradi
- **Repositories** - Ma'lumotlar bazasi bilan ishlash abstraktsiyasi
- **Services** - Biznes logikasi 