import { useRouter } from "next/router";
import Seo from "@/components/Seo";

type Props = {
  params: string[];
};

export default function Detail({ params }: Props) {
  const router = useRouter();
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }: any) {
  return {
    props: {
      params,
    },
  };
}
