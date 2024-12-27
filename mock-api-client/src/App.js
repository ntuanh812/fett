import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppExam from './AppExam';
import RevisionUser from './component/RevisionUser';
import RevisionListChap from './component/Revision/RevisionListChap';
import RevisionChap1 from './component/Revision/RevisionChap1';
import Home from './component/Home';
import Login from './Header/Login'
import RegisterForm from './Header/RegisterForm'
import './style/Login.css'
import './style/Register.css'
import SearchResultsPage from './component/Search/SearchResultsPage';

function App() {
  return (
    <div>
    <Router>  {/* Đảm bảo <Router> bao bọc toàn bộ ứng dụng */}
      <Routes>
        <Route exact path="/" element={<Home />} /> {/* Trang Chủ */}
        <Route exact path="/revision" element={<RevisionUser />} /> {/* Ôn Tập */}
        <Route path="/listChap/:subjectId" element={<RevisionListChap />} />        <Route exact path="/chap/:id" element={<RevisionChap1 />} />          {/* câu hỏi ôn tập theo chương */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/results" element={<SearchResultsPage/>}/>
      </Routes>
    </Router>

      {/* <AppRevision /> */}

      <AppExam />
      </div>
  );
}

export default App;
