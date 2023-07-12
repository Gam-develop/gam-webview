import { Outlet } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const CreateMagazine = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default CreateMagazine;
