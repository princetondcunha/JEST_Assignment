import Item from "./item";

function List({ data }) {
  return (
    <div>
      {data.map((province) => (
        <Item
          key={province.name}
          name={province.name}
          capital={province.capital}
          flagUrl={province.flagUrl}
        />
      ))}
    </div>
  );
}

export default List;
