require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodie-delights', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const products = [
  // Pizza
  {
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, olive oil',
    price: 12.99,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400'
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Pepperoni, mozzarella, tomato sauce',
    price: 14.99,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400'
  },
  {
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken, BBQ sauce, red onions, cilantro',
    price: 16.99,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400'
  },
  {
    name: 'Hawaiian Pizza',
    description: 'Ham, pineapple, mozzarella, tomato sauce',
    price: 15.99,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400'
  },
  {
    name: 'Vegetarian Supreme',
    description: 'Bell peppers, mushrooms, olives, onions, mozzarella',
    price: 14.99,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'
  },
  
  // Sushi
  {
    name: 'Salmon Nigiri',
    description: 'Fresh salmon slices over seasoned rice',
    price: 8.99,
    category: 'sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'
  },
  {
    name: 'California Roll',
    description: 'Crab, avocado, cucumber, sesame seeds',
    price: 10.99,
    category: 'sushi',
    imageUrl: 'https://images.unsplash.com/photo-1617196034796-73dfa7e1f3e3?w=400'
  },
  {
    name: 'Dragon Roll',
    description: 'Eel, avocado, cucumber, eel sauce',
    price: 15.99,
    category: 'sushi',
    imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400'
  },
  {
    name: 'Spicy Tuna Roll',
    description: 'Tuna, spicy mayo, cucumber, sesame seeds',
    price: 12.99,
    category: 'sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'
  },
  {
    name: 'Rainbow Roll',
    description: 'Assorted fish, avocado, cucumber, rice',
    price: 16.99,
    category: 'sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'
  },
  
  // Desserts
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 8.99,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400'
  },
  {
    name: 'Classic Tiramisu',
    description: 'Layers of coffee-soaked ladyfingers and mascarpone cream',
    price: 7.99,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400'
  },
  {
    name: 'New York Cheesecake',
    description: 'Rich and creamy cheesecake with graham cracker crust',
    price: 6.99,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=400'
  },
  {
    name: 'Fresh Fruit Tart',
    description: 'Buttery crust filled with pastry cream and topped with seasonal fruits',
    price: 9.99,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'
  },
  {
    name: 'Red Velvet Cake',
    description: 'Moist red velvet layers with cream cheese frosting',
    price: 7.49,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
  },
  {
    name: 'Crème Brûlée',
    description: 'Rich custard topped with a layer of hardened caramelized sugar',
    price: 8.49,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400'
  },
  
  // Beverages
  {
    name: 'Fresh Lemonade',
    description: 'Hand-squeezed lemons with a hint of mint and natural sweetness',
    price: 4.99,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400'
  },
  {
    name: 'Iced Caramel Macchiato',
    description: 'Espresso, milk, vanilla syrup, and caramel drizzle over ice',
    price: 5.49,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400'
  },
  {
    name: 'Mixed Berry Smoothie',
    description: 'Blend of strawberries, blueberries, raspberries with yogurt',
    price: 6.99,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400'
  },
  {
    name: 'Matcha Green Tea',
    description: 'Premium ceremonial grade matcha, lightly sweetened',
    price: 4.49,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  {
    name: 'Local Craft Beer',
    description: 'Rotating selection of local craft brews (Ask server for options)',
    price: 7.99,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'
  },
  {
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed oranges, served chilled',
    price: 5.99,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1563227815-66f4b676b732?w=400'
  },
  
  // Burgers
  {
    name: 'Classic Cheeseburger',
    description: 'Beef patty, cheddar cheese, lettuce, tomato, onion, and special sauce',
    price: 12.99,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'
  },
  {
    name: 'BBQ Bacon Burger',
    description: 'Beef patty, crispy bacon, cheddar, onion rings, and BBQ sauce',
    price: 14.99,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400'
  },
  {
    name: 'Mushroom Swiss Burger',
    description: 'Beef patty, sautéed mushrooms, Swiss cheese, and garlic aioli',
    price: 13.99,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400'
  },
  {
    name: 'Spicy Chicken Burger',
    description: 'Crispy chicken breast, spicy mayo, lettuce, and pickles',
    price: 11.99,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400'
  },
  {
    name: 'Double Patty Burger',
    description: 'Two beef patties, double cheese, bacon, and all the fixings',
    price: 16.99,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400'
  },
  {
    name: 'Veggie Burger',
    description: 'Plant-based patty, avocado, lettuce, tomato, and special sauce',
    price: 10.99,
    category: 'burgers',
    imageUrl: 'https://images.unsplash.com/photo-1525059696034-4967a7290025?w=400'
  }
];

const seedProducts = async () => {
  await connectDB();
  
  try {
    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');
    
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log(`Database already has ${existingProducts} products.`);
      console.log('To re-seed, delete existing products first or modify this script.');
      process.exit(0);
    }
    
    // Insert products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products!`);
    console.log('\nProducts added:');
    products.forEach(p => {
      console.log(`  - ${p.name} (${p.category}) - $${p.price}`);
    });
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error.message);
    process.exit(1);
  }
};

seedProducts();

