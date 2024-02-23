import axios from 'axios';
import { Order, Products, Tool, Product } from './structure';

// Function to calculate invoice price
 export const calculateInvoice = (product: Product, total: number): number => {
  if (product && 'unitPrice' in product && product.unitPrice) {
    return total + product.unitPrice;
  }
  return total;
};

// Function to build packages for orders
export const buildOrderPackages = (orders: Order[], products: Product[]): void => {
  orders.forEach(order => {
    const packageArticles: Product[] = [];
    let totalPrice: number = 0;

    order.articles.forEach(articleId => {
      const product = products.find(product => product.id === articleId);
      if (product && product.stock > 0) {
        packageArticles.push(product);
        product.stock--;
        totalPrice = calculateInvoice(product, totalPrice);
      } else {
        console.log(`package order ${order.id}: does not exist !!!`);
      }
    });

    console.log(`Package order ${order.id}: `, packageArticles);
    console.log( "Total Articles" + packageArticles.length)
    console.log(`Total price  ${order.id}: `, totalPrice.toFixed(3));
  });
};

// Function to produce a restocking list for products with low stock
export const produceRestockingList = (products: Product[]): void => {
  const restockingList: Product[] = products.filter(product => product.stock <= 3);
  console.log('Restocking List:', restockingList);
};

// Main function to fetch data and perform operations
const fetchDataAndPerformOperations = async (): Promise<void> => {
  try {
    const [heatPumps, installationMaterials, tools, orderList] = await Promise.all([
      axios.get<Products[]>('http://localhost:3000/heatPumps'),
      axios.get<Products[]>('http://localhost:3000/installationMaterials'),
      axios.get<Tool[]>('http://localhost:3000/tools'),
      axios.get<Order[]>('http://localhost:3000/orders')
    ]);

    const products: Product[] = [...heatPumps.data, ...installationMaterials.data, ...tools.data];
    const orders: Order[] = orderList.data;

    if (!orders || orders.length === 0) {
      console.log('No orders provided');
      return;
    }

    buildOrderPackages(orders, products);
    produceRestockingList(products);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchDataAndPerformOperations();
