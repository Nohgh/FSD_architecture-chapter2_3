import { BrowserRouter as Router } from "react-router-dom";
import Header from "../widgets/ui/Header.tsx";
import Footer from "../widgets/ui/Footer.tsx";
import PostsManagerPage from "../pages/PostsManagerPage.tsx";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* shared또는 widget...? 
        -> 공통으로 사용되는 유틸리티와 ui컴포넌트
        -> 재사용 가능한 복잡한 UI블록 
           헤더와 푸터가 복잡한가?
        */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
