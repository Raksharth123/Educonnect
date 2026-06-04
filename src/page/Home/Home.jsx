import Banner from "../../components/Home/Banner";
import CoursesSection from "../../components/Home/CourseSection";
import InspireTeacher from "../../components/Home/InspireTeacher";
import HighlightedClass from "./HighlightedClass";
import Faq from "../../components/Faq";
import GeminiUi from "../../components/gemini/GeminiUi";
import StatsHome from "../../components/Home/StatsHome";
import TeacherSection from "../../components/Home/TeacherSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className=" ">
        <StatsHome></StatsHome>
        <GeminiUi></GeminiUi>
        <HighlightedClass></HighlightedClass>
        <InspireTeacher></InspireTeacher>
        <CoursesSection></CoursesSection>
        <TeacherSection></TeacherSection>
        <Faq></Faq>
      </div>
    </div>
  );
};

export default Home;
