import { describe, expect, it } from 'vitest';
import { renderWithProviders } from 'tests/__helpers__/renders';

import { TabItem } from './tab-item';

describe('TabItem', () => {
  it('renders children when currentTabIndex equals tabIndex', () => {
    const screen = renderWithProviders(
      <TabItem tabIndex={0} currentTabIndex={0}>
        <div>Visible content</div>
      </TabItem>,
    );

    const tabPanel = screen.getByRole('tabpanel');
    expect(tabPanel).toBeVisible();
    expect(tabPanel).toHaveTextContent('Visible content');
    expect(tabPanel).not.toHaveAttribute('hidden');
  });

  it('does not render children when currentTabIndex does not equal tabIndex', () => {
    const screen = renderWithProviders(
      <TabItem tabIndex={0} currentTabIndex={1}>
        <div>Hidden content</div>
      </TabItem>,
    );

    const tabPanel = screen.queryByRole('tabpanel');
    expect(tabPanel).toEqual(null);
  });
});
