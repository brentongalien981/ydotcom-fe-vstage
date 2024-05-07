import React from 'react';
import { useSelector } from 'react-redux';
import { selectorProfile } from '../../redux/selectors/profileSelectors';
import "./Bio.css";


const Bio = () => {

  const profile = useSelector(selectorProfile);


  return (
    <div className='d-flex justify-content-center profile-bio'>
      <table>
        <tbody>

          <tr>
            <td>profession:</td>
            <td>{profile.profession}</td>
          </tr>

          <tr>
            <td>email:</td>
            <td>{profile.email}</td>
          </tr>

          <tr>
            <td>country:</td>
            <td>{profile.country}</td>
          </tr>

          <tr>
            <td>hobby:</td>
            <td>{profile.hobby}</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};


export default Bio;