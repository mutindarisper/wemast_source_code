
export function handleUserSelections ({commit},selection) {
    commit("manageSelections", selection)
}
export function handleCompareSelections ({commit},selection) {
    commit("manageCompareSelections", selection)
}

