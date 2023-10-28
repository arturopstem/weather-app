function populate(list, locations) {
  list.replaceChildren();
  locations.forEach((location) => {
    const { name, region, country } = location;
    const option = document.createElement('option');
    option.value = `${name} ${region} ${country}`;
    list.appendChild(option);
  });
}

function removeOptions(list) {
  list.replaceChildren();
}

export { populate, removeOptions };
