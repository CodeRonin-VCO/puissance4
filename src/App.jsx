import './App.css';
import FooterPage from './layout/footer/footer.jsx';
import HeaderPage from './layout/header/header.jsx';
import MainHomePage from './pages/home/main.jsx';

function App() {

    return (
        <div className='page'>
            <HeaderPage />
            <MainHomePage />
            <FooterPage />
        </div>
    )
}

export default App;
