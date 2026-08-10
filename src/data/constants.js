export const availabilityStatuses = [
  'Available on Confirmation',
  'Check Availability',
  'Usually Dispatched in 2–3 Days',
  'Out of Stock'
]

export const orderStatuses = [
  'Pending Confirmation',
  'Vendor Checking',
  'Confirmed',
  'Bought from Vendor',
  'Packed',
  'Dispatched',
  'Delivered',
  'Cancelled'
]

export const paymentMethods = ['COD', 'Easypaisa', 'JazzCash', 'Bank Transfer']

export const categories = [
  {
    id: 'led-lights',
    name: 'LED Lights',
    image: '/images/categories/led-lights.jpg',

    subcategories: [
      {
        id: 'headlights',
        name: 'Headlights'
      },
      {
        id: 'fog-lights',
        name: 'Fog Lights'
      },
      {
        id: 'indicators',
        name: 'Indicators'
      },
      {
        id: 'interior-leds',
        name: 'Interior LEDs'
      }
    ]
  },

  {
    id: 'owner-kits',
    name: 'Exterior Accessories',
    image: '/images/categories/exterior.jpg',

    subcategories: [
      {
        id: 'top-covers',
        name: 'Top Covers'
      },
      {
        id: 'air-press',
        name: 'Air Press'
      },
      // {
      //   id: '',
      //   name: 'Body Kits'
      // },
      // {
      //   id: 'number-plates',
      //   name: 'Number Plates'
      // }
    ]
  },

  {
    id: 'interior-accessories',
    name: 'Interior Accessories',
    image: '/images/categories/interior.jpg',

    subcategories: [
      {
        id: 'dashboard',
        name: 'Dashboard'
      },
      {
        id: 'floor-mats',
        name: 'Floor Mats'
      },
      {
        id: 'sun-shades',
        name: 'Sun Shades'
      },
      {
        id: 'android',
        name: 'Android / Multimedia'
      },
      {
        id: 'steering',
        name: 'Steering Accessories'
      },
      {
        id: 'interior-lighting',
        name: 'Interior Lighting'
      }
    ]
  },

  {
    id: 'car-care',
    name: 'Car Care',
    image: '/images/categories/car-care.jpg',

    subcategories: [
      {
        id: 'car-wash',
        name: 'Car Wash'
      },
      {
        id: 'polish-wax',
        name: 'Polish & Wax'
      },
      {
        id: 'dashboard-care',
        name: 'Dashboard Care'
      },
      {
        id: 'interior-cleaning',
        name: 'Interior Cleaning'
      },
      {
        id: 'microfiber',
        name: 'Microfiber & Towels'
      },
      {
        id: 'key-cover',
        name: 'Key Cover'
      }
    ]
  },

  {
    id: 'security-utility',
    name: 'Security & Utility',
    image: '/images/categories/security.jpg',

    subcategories: [
      {
        id: 'car-security',
        name: 'Car Security'
      },
      {
        id: 'dash-cams',
        name: 'Dash Cams'
      },
      {
        id: 'parking-sensors',
        name: 'Parking Sensors'
      },
      {
        id: 'car-tools',
        name: 'Car Tools'
      },
      {
        id: 'utility',
        name: 'Utility Accessories'
      }
    ]
  }
]