import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import PDFUpload from './pages/PDFUpload';
import AITutor from './pages/AITutor';
import VoiceTutor from './pages/VoiceTutor';
import ImageScanner from './pages/ImageScanner';
import SummaryGenerator from './pages/SummaryGenerator';
import QuizGenerator from './pages/QuizGenerator';
import StudyPlanner from './pages/StudyPlanner';
import ProgressTracker from './pages/ProgressTracker';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

function App() {
  const router = createBrowserRouter(
    [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/forgot', element: <ForgotPassword /> },
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'pdf-upload', element: <PDFUpload /> },
          { path: 'ai-tutor', element: <AITutor /> },
          { path: 'voice-tutor', element: <VoiceTutor /> },
          { path: 'image-scanner', element: <ImageScanner /> },
          { path: 'summary', element: <SummaryGenerator /> },
          { path: 'quiz', element: <QuizGenerator /> },
          { path: 'study-planner', element: <StudyPlanner /> },
          { path: 'progress', element: <ProgressTracker /> }
        ]
      },
      { path: '*', element: <NotFound /> }
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
