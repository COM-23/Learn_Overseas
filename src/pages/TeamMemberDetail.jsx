import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeamMemberProfile from './TeamMemberProfile';

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <TeamMemberProfile id={id} onClose={() => navigate('/about/team')} />;
}
