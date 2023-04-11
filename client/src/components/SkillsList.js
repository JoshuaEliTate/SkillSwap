import React from 'react';
import { Link } from 'react-router-dom';

const SkillList = (skills) => {
  if (!skills.length) {
    return <h3>No skills Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {skills &&
          skills.map((skill) => (
            <div key={skill._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {skill.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                     {skill.description}
                    
                    {skill.price}
                    {skill.user}
                  </span>
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillList;
