import { getUserId } from "../src/features/auth/helpers";
import OrdersList from "../src/features/orders/components/OrdersList";

export default async function Page() {
  const userId = await getUserId();

  return (
    <div className="flex gap-5 flex-col items-center w-full">
      <OrdersList userId={userId} />
    </div>
  );
}
