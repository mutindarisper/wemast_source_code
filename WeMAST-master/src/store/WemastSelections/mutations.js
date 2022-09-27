export function manageSelections(state, selection) {
  state.selections = { ...state.selections, ...selection };
  const sanitized = sanitize(state.selections, selection);
  state.selections = sanitized;
}
export function manageCompareSelections(state, selection) {
  const sanitized = sanitize(
    { ...state.compare_selections, ...{ region: state.selections.region } },
    selection
  );
  state.compare_selections = sanitized;
}

const sanitize = (state, incoming) =>
  Object.fromEntries(
    Object.entries({ ...state, ...incoming }).filter(([_, v]) => {
      if (v !== null || v !== "") {
        return v;
      }
    })
  );
