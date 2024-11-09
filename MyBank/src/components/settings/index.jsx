import PropTypes from 'prop-types';
//
import SettingsDrawer from './drawer';
//
import ThemeContrast from './ThemeContrast.jsx';
import ThemeRtlLayout from './ThemeRtlLayout.jsx';
import ThemeColorPresets from './ThemeColorPresets.jsx';
import ThemeLocalization from './ThemeLocalization.jsx';

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ThemeSettings({ children }) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeLocalization>
          <ThemeRtlLayout>
            {children}
            <SettingsDrawer />
          </ThemeRtlLayout>
        </ThemeLocalization>
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
