import { Elements } from "@stripe/react-stripe-js";
import useGetCustomerId from "@/app/hooks/payment/useGetCustomerId";
import { CardsInner } from "./CardsInner";
import { stripePromise } from "@/lib/stripe";

// ─── CardsInner — needs to be inside <Elements> to use useStripe ──────────────

// const CardsInner = ({
//   customerId,
//   isLoadingCustomerId,
// }: {
//   customerId: string | null;
//   isLoadingCustomerId: boolean;
// }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   // const [isPending, setIsPending] = useState(false);
//   // const [error, setError] = useState<string | null>(null);
//   const [cardholderName, setCardholderName] = useState("");
//   const [postalCode, setPostalCode] = useState("");

//   const { allCards, isLoading: isLoadingCards } = useGetPaymentMethods();

//   const { mutate: setupCard, isPending, error } = useSetupCard();

//   const handleSave = () => {
//     if (!customerId) return;

//     setupCard(
//       { customerId, cardholderName, postalCode },
//       {
//         onSuccess: () => {
//           setShowAddForm(false);
//           setCardholderName("");
//           setPostalCode("");
//         },
//       },
//     );
//   };

//   // ─── Delete card ────────────────────────────────────────────────────────────

//   const handleDelete = async (card: StripePaymentMethod) => {
//     //work on it...
//   };

//   const handleCancel = () => {
//     setShowAddForm(false);
//     setCardholderName("");
//     setPostalCode("");
//     // setError(null);
//   };

//   const isLoading = isLoadingCustomerId || isLoadingCards;

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <CardTitle className="flex items-center gap-2">
//             <CreditCard className="h-5 w-5" />
//             Payment Methods
//           </CardTitle>
//           {!showAddForm && (
//             <Button size="sm" onClick={() => setShowAddForm(true)}>
//               <Plus className="h-4 w-4 mr-2" />
//               Add Card
//             </Button>
//           )}
//         </div>
//       </CardHeader>

//       {isLoading ? (
//         <CardContent className="flex items-center justify-center py-8">
//           <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
//         </CardContent>
//       ) : (
//         <CardContent className="space-y-4">
//           {showAddForm && (
//             <AddCardForm
//               cardholderName={cardholderName}
//               postalCode={postalCode}
//               isPending={isPending}
//               error={error}
//               onCardholderNameChange={setCardholderName}
//               onPostalCodeChange={setPostalCode}
//               onSave={handleSave}
//               onCancel={handleCancel}
//             />
//           )}

//           {allCards?.length === 0 && !showAddForm && (
//             <p className="text-sm text-muted-foreground">
//               No payment methods saved yet. Add one to speed up checkout.
//             </p>
//           )}

//           {allCards?.length > 0 && (
//             <div className="space-y-3">
//               {allCards.map((card) => {
//                 const isDeleting = false //have to work on it...

//                 return (
//                   <div
//                     key={card.id}
//                     className={`border rounded-lg p-4 flex items-center justify-between ${
//                       card.customer_default ? "border-primary bg-primary/5" : ""
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <CreditCard className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <p className="font-medium">
//                             {card.card.brand.toUpperCase()} ••••{" "}
//                             {card.card.last4}
//                           </p>
//                           {card.customer_default && (
//                             <Badge variant="secondary" className="text-xs">
//                               Default
//                             </Badge>
//                           )}
//                         </div>
//                         <p className="text-sm text-muted-foreground">
//                           Expires {card.card.exp_month}/{card.card.exp_year}
//                         </p>
//                       </div>
//                     </div>

//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       disabled={isDeleting}
//                       onClick={() => handleDelete(card)}
//                       className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
//                     >
//                       {isDeleting ? (
//                         <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <Trash2 className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </CardContent>
//       )}
//     </Card>
//   );
// };

const Cards = () => {
  const { data: customerId, isLoading: isLoadingCustomerId } =
    useGetCustomerId();

  return (
    <Elements stripe={stripePromise}>
      <CardsInner
        customerId={customerId ?? null}
        isLoadingCustomerId={isLoadingCustomerId}
      />
    </Elements>
  );
};

export default Cards;
