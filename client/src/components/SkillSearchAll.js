import React from 'react';
import { Link } from 'react-router-dom';

const SkillsList = ({ skills, title }) => {
  if (!skills.length) {
    return <h3>No Skills Yet</h3>;
  }
  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {skills &&
          skills.map((skills) => (
            
            <div key={skills._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <ul>
                    <li>
                    Skill: {skills.skillName}
                    </li>
                    <li>
                        Description: {skills.description}
                    </li>
                    <li>
                        Price: ${skills.price}
                    </li>
                    <li>
                        User: {skills.user.username}
                    </li>
                    <li>
                        Email: {skills.user.email}
                    </li>
                </ul>

{/*             
                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  View and endorse their skills.
                </Link> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillsList;
