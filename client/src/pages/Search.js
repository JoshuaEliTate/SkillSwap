// import React, { useState } from 'react';
// import SkillList from '../components/SkillsList';
// import { QUERY_SINGLE_SKILL } from '../utils/queries';
// import { useQuery } from '@apollo/client';

// const Search = () => {
//   const { loading, data } = useQuery(QUERY_SINGLE_SKILL)
//   const skill = data?.skill || [];

//   return (
//     <main>
//       <div className="flex-row justify-center">
//         <div className="col-12 col-md-10 my-3">
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <SkillList
//               skill={skill}
//             />
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Search;