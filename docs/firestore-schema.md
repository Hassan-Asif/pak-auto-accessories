# Firestore Schema

## products

Public fields:

- `name: string`
- `category: string`
- `carBrand: string`
- `carModel: string`
- `description: string`
- `price: number`
- `sellingPrice: number`
- `estimatedDelivery: string`
- `availabilityStatus: "Available on Confirmation" | "Check Availability" | "Usually Dispatched in 2–3 Days" | "Out of Stock"`
- `images: string[]`
- `isFeatured: boolean`
- `isActive: boolean`
- `createdAt: timestamp`
- `updatedAt: timestamp`

Admin-only fields:

- `vendorPrice: number`
- `profit: number`
- `vendorName: string`
- `vendorContact: string`

## orders

- `customer.name: string`
- `customer.phone: string`
- `customer.email: string`
- `customer.city: string`
- `customer.address: string`
- `items: array`
- `totals.subtotal: number`
- `totals.delivery: number`
- `totals.total: number`
- `paymentMethod: "COD" | "Easypaisa" | "JazzCash" | "Bank Transfer"`
- `paymentInstruction: string`
- `status: "Pending Confirmation" | "Vendor Checking" | "Confirmed" | "Bought from Vendor" | "Packed" | "Dispatched" | "Delivered" | "Cancelled"`
- `notes: string`
- `createdAt: timestamp`
- `updatedAt: timestamp`

## categories

- `name: string`
- `slug: string`
- `image: string`
- `sortOrder: number`
- `isActive: boolean`

## customers

- `name: string`
- `phone: string`
- `email: string`
- `city: string`
- `address: string`
- `createdAt: timestamp`
- `lastOrderAt: timestamp`

## admins

Document id must equal the Firebase Auth user uid.

- `email: string`
- `role: "owner" | "manager"`
- `createdAt: timestamp`

## settings

- `whatsappNumber: string`
- `storeCity: string`
- `deliveryNote: string`
- `paymentNotice: string`
