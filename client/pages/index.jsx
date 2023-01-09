import Link from "next/link";
const Index = (props) => {
  const { currentUser, tickets } = props;

  return currentUser ? (
    <Tickets tickets={tickets} />
  ) : (
    <h2>YOu are not sign in</h2>
  );
};

const Tickets = ({ tickets }) => {
  if (!tickets) {
    return <h1>No tickets</h1>;
  }
  return (
    <>
      <ul>
        {tickets.map((ticket) => {
          return (
            <li key={ticket.id}>
              {ticket.title}-
              <Link href="/tickets/[id]" as={`/tickets/${ticket.id}`}>
                {ticket.price}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
Index.getInitialProps = async (context, axiosNext, currentUser) => {
  const tickets = await axiosNext(context).get("/api/tickets");
  console.log(
    "🚀 ~ file: index.jsx:32 ~ Index.getInitialProps= ~ tickets",
    tickets.data
  );

  return { tickets: tickets.data };
};
export default Index;
