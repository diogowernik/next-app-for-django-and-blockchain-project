// @/pages/[profile].js

import WtreeProfileView from "@/components/profile/WtreeProfileView";
import defaultTheme from "@/styles/profile-themes/defaultTheme";
import { ThemeProvider } from "@emotion/react";

export default function WtreeProfile() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <div style={{ paddingTop: '50px' }}>
                <WtreeProfileView />
            </div>
        </ThemeProvider>
    );
}