---
name: ReservePro
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#414755'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#727786'
  outline-variant: '#c1c6d7'
  surface-tint: '#0059c7'
  primary: '#0057c2'
  on-primary: '#ffffff'
  primary-container: '#006ef2'
  on-primary-container: '#fefcff'
  inverse-primary: '#afc6ff'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#636262'
  tertiary: '#9e3d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c64f00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#afc6ff'
  on-primary-fixed: '#001a43'
  on-primary-fixed-variant: '#004398'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7c2e00'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  h1:
    fontFamily: Inter
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 46px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: '0'
  h1-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 22px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1440px
  gutter: 16px
---

## Brand & Style
The design system is engineered for high-stakes enterprise environments where clarity, speed of cognition, and trust are paramount. It adopts a **Corporate Modern** aesthetic, blending the systematic rigor of international design standards with the clean, functional minimalism of modern SaaS.

The visual language communicates reliability and precision through a restrained color palette, intentional whitespace, and a strict adherence to a logic-driven layout. The emotional response is one of calm control; the UI recedes to prioritize user data and booking workflows, utilizing subtle depth and soft geometry to guide the eye without distraction.

## Colors
The palette is centered around a "Deep Professional Blue" that serves as the primary driver for interaction and brand presence. 

- **Primary:** A vibrant yet authoritative blue used for primary actions, active states, and key brand moments.
- **Neutral Surface:** The application uses a light gray background (`#f0f2f5`) to create a natural separation between the canvas and white component containers.
- **Typography & Borders:** Text scales from deep ebony for headings to mid-grays for secondary information. Borders are kept to a consistent, subtle light gray to define structure without creating visual noise.
- **Functional Colors:** Standardized success, warning, and error tokens ensure consistent feedback across the booking lifecycle.

## Typography
This design system utilizes **Inter** for all roles, leveraging its exceptional legibility and systematic weight distribution. 

The hierarchy is built on a tight scale to maintain a professional, data-dense environment. Headings use a semi-bold weight (`600`) with slight negative letter-spacing to appear more cohesive at larger sizes. Body text is optimized at `14px` for the majority of UI interactions, providing a balance between information density and readability. Labels and captions utilize medium weights to distinguish metadata from primary content.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop to maintain structural integrity in complex dashboards, transitioning to a **Fluid Grid** for mobile and tablet devices.

- **Grid:** A 12-column system with a `16px` gutter. 
- **Margins:** Desktop views utilize a minimum `24px` margin, while mobile views use `16px`.
- **Rhythm:** Spacing is strictly based on an **8px linear scale**. This ensures vertical rhythm across cards, forms, and lists. Generous padding within cards (`24px`) is encouraged to prevent the interface from feeling cramped during heavy data entry.
- **Breakpoints:** 
  - Mobile: < 576px
  - Tablet: 576px - 992px
  - Desktop: > 992px

## Elevation & Depth
This design system employs **Tonal Layers** and **Ambient Shadows** to create a structured hierarchy. 

The primary background is the lowest layer (`#f0f2f5`). Functional components like cards, modals, and popovers sit on the top layer with a pure white (`#ffffff`) fill. 

- **Low Elevation:** Used for cards and persistent surfaces. 1px solid border (`#d9d9d9`) with no shadow or a very faint, 2px blur shadow.
- **Mid Elevation:** Used for dropdowns and tooltips. Subtle diffused shadow: `0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08)`.
- **High Elevation:** Reserved for modals and critical dialogs. Deep, soft shadows to draw focus and indicate a modal state.

## Shapes
The shape language is professional and approachable, utilizing a consistent `8px` (0.5rem) corner radius for most UI elements. 

- **Standard Components:** Buttons, Input fields, and Cards use the base `8px` radius.
- **Small Elements:** Tags and Chips may use a slightly reduced `4px` radius or a full pill shape depending on context.
- **Containers:** Large page containers or sections maintain the `8px` radius to ensure a cohesive visual rhythm across the dashboard.

## Components
The components in this design system are inspired by the functional clarity of Ant Design, optimized for high-performance booking management.

- **Buttons:** Primary buttons use a solid primary blue fill with white text. Secondary buttons use a white fill with a 1px border. All buttons have an `8px` height padding and a minimum width to ensure a consistent hit area.
- **Input Fields:** Use a 1px border (`#d9d9d9`). Focus states transition the border to the primary blue and add a subtle blue glow (outline).
- **Cards:** The workhorse of the system. White background, 1px border, and `24px` internal padding. Titles within cards should be `h3` or `label-md` depending on hierarchy.
- **Chips/Status Tags:** Used for booking statuses (e.g., "Confirmed", "Pending"). These use a "Soft Fill" approach: a light tint of the status color for the background and the full-saturation color for the text.
- **Lists/Tables:** Data rows should have a hover state (`#fafafa`) and use `16px` vertical padding for high readability. Dividers are `1px` thick and light gray.
- **Booking Calendar:** Use a clean grid with the primary blue for selected dates and soft grays for disabled/past dates.