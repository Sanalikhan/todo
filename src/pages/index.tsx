import { Header } from "@/components/header";
import { Banner } from "@/components/banner";
import { TasksList } from "@/components/taskslist";


export default function Home() {

  return (
    <div>
      <Header/>
      <Banner/>
      <TasksList/>
    </div>
  );
}
