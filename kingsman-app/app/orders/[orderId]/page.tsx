import { loadOrder } from "@/app/src/features/orders/actions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
type OrderItemProps = {
  params: Promise<{ orderId: string }>;
};

const STEPS = [
  { key: "PLACED", label: "Order Placed" },
  { key: "PAID", label: "Order Paid" },
  { key: "SHIPPED", label: "Shipped Out" },
  { key: "RECEIVED", label: "Received" },
  { key: "RATED", label: "To Rate" },
] as const;

const MOCK_ADDRESS = {
  name: "Kenzo Castillo",
  phone: "(+63) 999 999 9999",
  line1: "Lorem Ipsum St., Brgy. Dolor Sit",
  line2: "Quezon City, Metro Manila, 1116",
};

const MOCK_TRACKING = [
  {
    time: "06/24/2026 11:02",
    label: "Delivered",
    detail: "Parcel has been delivered",
  },
  {
    time: "06/24/2026 08:28",
    label: "In Transit",
    detail: "Parcel is out for delivery",
  },
  {
    time: "06/24/2026 06:10",
    label: "In Transit",
    detail: "Arrived at East QC Hub",
  },
  {
    time: "06/23/2026 14:18",
    label: "Shipped Out",
    detail: "Departed from sorting facility",
  },
];

export default async function OrderItemPage({ params }: OrderItemProps) {
  const { orderId } = await params;
  const order = await loadOrder(orderId);

  if (!order) notFound();

  const total = order.orderItems.reduce(
    (acc, item) => item.price * item.quantity + acc,
    0,
  );

  const currentStepIndex = STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        {/* HEADER */}
        <div className="flex flex-col gap-10">
          <a
            href="/orders"
            className="text-xs tracking-widest text-gray-400 uppercase hover:text-black transition"
          >
            ← Back
          </a>
          <div className="flex justify-between items-end border-b border-gray-200 pb-8">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">
                Order ID
              </p>
              <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
                {order.id}
              </h1>
            </div>
            <p className="text-xs tracking-[0.3em] uppercase">{order.status}</p>
          </div>
        </div>

        {/* STATUS STEPPER */}
        <div className="flex items-start">
          {STEPS.map((step, i) => {
            const done = i <= currentStepIndex;
            const isLast = i === STEPS.length - 1;
            return (
              <div
                key={step.key}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      done ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                  <p
                    className={`text-[10px] tracking-widest uppercase text-center w-20 ${
                      done ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {!isLast && (
                  <div
                    className={`h-px flex-1 mx-2 mb-6 ${
                      i < currentStepIndex ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* DELIVERY ADDRESS + TRACKING */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-200 pt-12">
          {/* ADDRESS */}
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
              Delivery Address
            </p>
            <div className="flex flex-col gap-1 text-sm tracking-wide">
              <p className="font-medium">{MOCK_ADDRESS.name}</p>
              <p className="text-gray-500">{MOCK_ADDRESS.phone}</p>
              <p className="text-gray-500">{MOCK_ADDRESS.line1}</p>
              <p className="text-gray-500">{MOCK_ADDRESS.line2}</p>
            </div>
          </div>

          {/* TRACKING TIMELINE */}
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
              Tracking
            </p>
            <div className="flex flex-col">
              {MOCK_TRACKING.map((event, i) => (
                <div key={i} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                        i === 0 ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                    {i !== MOCK_TRACKING.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p
                      className={`text-xs tracking-wide ${
                        i === 0 ? "text-black" : "text-gray-400"
                      }`}
                    >
                      {event.label}
                    </p>
                    <p className="text-xs text-gray-400">{event.detail}</p>
                    <p className="text-[10px] text-gray-300 tracking-widest uppercase mt-0.5">
                      {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ITEMS */}
        <div className="flex flex-col gap-8 border-t border-gray-200 pt-12">
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">
            Items
          </p>
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-6 group">
              <div className="relative w-16 h-20 bg-gray-100 overflow-hidden">
                <Image
                  fill
                  src={item.product.image ?? ""}
                  alt={item.product.name}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-sm tracking-wide">{item.product.name}</p>
                  <p className="text-xs text-gray-400 tracking-widest uppercase">
                    Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm tracking-wide">
                  ₱{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL + ACTIONS */}
        <div className="flex flex-col gap-8 border-t border-gray-200 pt-8">
          <div className="flex justify-end">
            <p className="text-sm tracking-wide">
              Total —{" "}
              <span className="font-medium tracking-wide">₱{total}</span>
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <Link
              href="/products"
              className="text-xs tracking-[0.3em] uppercase border border-gray-200 px-6 py-3 hover:border-black transition"
            >
              Buy Again
            </Link>
            <Link
              href="/contact"
              className="text-xs tracking-[0.3em] uppercase bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
            >
              Contact Seller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
