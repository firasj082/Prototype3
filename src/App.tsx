import React, { useState } from 'react';
import { Package, Info, ArrowLeft, Plus, MapPin, Clock, Wrench as Tool, ShoppingCart, Truck, Calendar, Check } from 'lucide-react';

interface DeliveryItem {
  id: number;
  name: string;
  status: string;
  destination: string;
  availability: string;
}

interface RequestedCart {
  id: number;
  items: DeliveryItem[];
  requestDate: string;
  status: 'Pending' | 'Processing' | 'Delivered';
}

function App() {
  const [selectedItem, setSelectedItem] = useState<DeliveryItem | null>(null);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedItems, setAddedItems] = useState<DeliveryItem[]>([]);
  const [requestedCarts, setRequestedCarts] = useState<RequestedCart[]>([]);

  const deliveryItems: DeliveryItem[] = [
    {
      id: 1,
      name: "Electronics Package",
      status: "In Transit",
      destination: "123 Tech Street, Silicon Valley",
      availability: "Next Day Delivery"
    },
    {
      id: 2,
      name: "Fashion Items",
      status: "Out for Delivery",
      destination: "456 Fashion Ave, New York",
      availability: "Same Day Delivery"
    },
    {
      id: 3,
      name: "Books Bundle",
      status: "Processing",
      destination: "789 Library Road, Boston",
      availability: "2-3 Business Days"
    },
    {
      id: 4,
      name: "Home Decor",
      status: "Delivered",
      destination: "321 Home Street, Chicago",
      availability: "Standard Shipping"
    }
  ];

  const handleDetails = (item: DeliveryItem) => {
    setSelectedItem(item);
    setIsDetailPage(true);
    setIsDevToolsOpen(false);
    setIsCartOpen(false);
  };

  const handleBack = () => {
    setIsDetailPage(false);
    setSelectedItem(null);
  };

  const handleAddItem = (item: DeliveryItem) => {
    if (!addedItems.find(addedItem => addedItem.id === item.id)) {
      setAddedItems([...addedItems, item]);
    }
    alert('Item added to cart!');
  };

  const handleDevTools = () => {
    setIsDevToolsOpen(true);
    setIsDetailPage(false);
    setIsCartOpen(false);
    setSelectedItem(null);
  };

  const handleCart = () => {
    setIsCartOpen(true);
    setIsDetailPage(false);
    setIsDevToolsOpen(false);
    setSelectedItem(null);
  };

  const handleRequestDelivery = () => {
    const newCart: RequestedCart = {
      id: requestedCarts.length + 1,
      items: [...addedItems],
      requestDate: new Date().toLocaleString(),
      status: 'Pending'
    };
    setRequestedCarts([...requestedCarts, newCart]);
    setAddedItems([]);
    setIsCartOpen(false);
    alert('Delivery request submitted successfully!');
  };

  const handleAcceptDelivery = (cartId: number) => {
    setRequestedCarts(carts =>
      carts.map(cart =>
        cart.id === cartId
          ? { ...cart, status: 'Processing' }
          : cart
      )
    );
  };

  const CartView = () => (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => setIsCartOpen(false)}
        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to List</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          Your Cart ({addedItems.length} items)
        </h2>

        <div className="space-y-4 mb-8">
          {addedItems.length === 0 ? (
            <p className="text-gray-500 italic">Your cart is empty</p>
          ) : (
            addedItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-gray-600 text-sm">{item.destination}</p>
                    <p className="text-gray-600 text-sm">Availability: {item.availability}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {addedItems.length > 0 && (
          <button
            onClick={handleRequestDelivery}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Truck className="h-5 w-5" />
            <span>Request Delivery</span>
          </button>
        )}
      </div>
    </div>
  );

  const DevToolsView = () => (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => setIsDevToolsOpen(false)}
        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to List</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Tool className="h-6 w-6" />
          Development Tools (Delivery Agent)
        </h2>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">Requested Carts ({requestedCarts.length})</h3>
          {requestedCarts.length === 0 ? (
            <p className="text-gray-500 italic">No delivery requests yet</p>
          ) : (
            requestedCarts.map((cart) => (
              <div
                key={cart.id}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-800">Cart #{cart.id}</h4>
                  </div>
                  {cart.status === 'Pending' ? (
                    <button
                      onClick={() => handleAcceptDelivery(cart.id)}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Check className="h-4 w-4" />
                      <span>Accept Delivery</span>
                    </button>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      cart.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cart.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>Requested: {cart.requestDate}</span>
                </div>
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-700">Items ({cart.items.length})</h5>
                  {cart.items.map((item) => (
                    <div key={item.id} className="pl-4 border-l-2 border-gray-200">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.destination}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const DetailPage = ({ item }: { item: DeliveryItem }) => (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to List</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h2 className="text-3xl font-bold">{item.name}</h2>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
            item.status === 'Delivered' ? 'bg-green-500' :
            item.status === 'In Transit' ? 'bg-blue-500' :
            item.status === 'Processing' ? 'bg-yellow-500' :
            'bg-purple-500'
          }`}>
            {item.status}
          </span>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-3">
            <MapPin className="h-6 w-6 text-gray-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Delivery Location</h3>
              <p className="text-gray-600">{item.destination}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="h-6 w-6 text-gray-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Availability</h3>
              <p className="text-gray-600">{item.availability}</p>
            </div>
          </div>

          <button
            onClick={() => handleAddItem(item)}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="text-xl font-bold">e-Delivery</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCart}
              className="flex items-center space-x-2 bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-400 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">Cart ({addedItems.length})</span>
            </button>
            <div className="text-lg font-semibold">Welcome</div>
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        {isCartOpen ? (
          <CartView />
        ) : isDevToolsOpen ? (
          <DevToolsView />
        ) : isDetailPage && selectedItem ? (
          <DetailPage item={selectedItem} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Items</h2>
            
            <div className="grid gap-4">
              {deliveryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 mt-1">Status: 
                        <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                          item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          item.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {item.status}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDetails(item)}
                      className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      <Info className="h-4 w-4" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex justify-end">
          <button
            onClick={handleDevTools}
            className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <Tool className="h-4 w-4" />
            <span>Development Tool (Delivery Agent)</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;