# Neon LEDs

Production-ready Vue 3 + Firebase e-commerce starter for a Pakistan car accessories business where orders are confirmed with vendors before payment.

## Stack

- Vue 3, Vite, Vue Router, Pinia
- Tailwind CSS
- Firebase Auth, Firestore, Storage, Hosting

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill `.env` with Firebase web app keys and add your Firebase project id in `.firebaserc`.

## Admin Setup

1. Create an admin user in Firebase Authentication.
2. Add a Firestore document at `admins/{uid}`:

```json
{
  "email": "admin@example.com",
  "role": "owner",
  "createdAt": "serverTimestamp"
}
```

Admin-only product fields are only displayed and editable inside `/admin`.

## Business Rules Implemented

- Storefront never displays `In Stock`.
- Payment notice tells customers not to pay before vendor confirmation.
- Product statuses: `Available on Confirmation`, `Check Availability`, `Usually Dispatched in 2–3 Days`, `Out of Stock`.
- Order statuses: `Pending Confirmation`, `Vendor Checking`, `Confirmed`, `Bought from Vendor`, `Packed`, `Dispatched`, `Delivered`, `Cancelled`.
- WhatsApp support, product inquiry, and order follow-up links.
- Firestore and Storage rules protect admin-only writes and image uploads.
