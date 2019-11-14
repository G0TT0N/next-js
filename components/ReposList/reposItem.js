export default (props) => {
  const {
    name,
    updated_at,
    stargazers_count
  } = props.row;
  
  const updated = Date(updated_at).toLocaleString();
  return <div>
     <p> Name: {name} Last Update: {updated} Stars: {stargazers_count} {}</p>
  </div>
};


