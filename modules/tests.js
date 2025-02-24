// Run tests
const testLines = (lines) => {
  const testUnique = (arr) => {
    const used = [];
    let pass = true;
    arr.forEach((item) => {
      if (used.includes(item)) {
        console.error("Some items are not unique", arr);
        pass = false;
      }
      used.push(item);
    });
    return pass;
  };

  const testRows = (lines) => {
    let pass = true;
    lines.forEach((row) => {
      if (!testUnique(row)) {
        pass = false;
      }
    });
    return pass;
  };

  const testColumns = (lines) => {
    const columns = [];
    for (let i = 0; i < lines.length; i++) {
      const column = [];
      lines.forEach((line) => {
        column.push(line[i]);
      });
      columns.push(column);
    }

    let pass = true;
    columns.forEach((column) => {
      if (!testUnique(column)) {
        pass = false;
      }
    });
    return pass;
  };

  // TODO: add tests for boxes
  const testBoxes = (lines) => {};

  const testBox = (box) => {};

  let pass = true;
  pass = testRows(lines) && testColumns(lines);
  if (pass) {
    console.log("All tests pass");
  } else {
    console.error("Some tests failed");
  }
};

export default testLines;
