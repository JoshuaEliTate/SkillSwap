import React, { useState } from 'react';
import SkillList from '../components/SkillsList';
import { QUERY_SKILLS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Home = () => {
  const { loading, data } = useQuery(QUERY_SKILLS);
  const skills = data?.skills || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SkillList
              skills={skills}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;