import NavBar from "./NavBar";

type Props = {
  children: any;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
