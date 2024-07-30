import { act, screen } from "@testing-library/react";
import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";
import { renderWithProviders } from "../../utils/test-utils/renderWithProviders";

it("renders initial <RecommendedUsers /> correctly", async () => {

  // Render with redux and the store.
  let container;
  act(() => {
    const { asFragment } = renderWithProviders(
      <RecommendedUsers />
    );
    container = asFragment;
  });

  // Reference the component.
  const recommendedUsersComponent = screen.getByTestId("recommendedUsersTestId");

  // Assert that the component is rendered
  expect(recommendedUsersComponent).toBeInTheDocument();

  // Assert that the snapshot matches.
  expect(container()).toMatchSnapshot();

});