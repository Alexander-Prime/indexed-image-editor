`indexed-image-editor` (working title, IIE for short) is a drawing application designed for animated pixel art using both frame-by-frame animations and color cycling. It is largely inspired by the animation methods used by classic video game artists, as described in [this GDC talk](https://youtu.be/aMcJ1Jvtef0), and aims to be a simple, streamlined tool to create art within those original constraints

IIE plans to include some unique features to streamline workflow:

* ☑ Automatic creation of new frames
* ☐ "Lean" keys to show adjacent frames, similar to traditional page flipping techniques ([example](https://youtu.be/ilFaePXngac))
* ☐ Mirrored controls for left-handed artists
* ☐ Continuous auto-save via LocalStorage

# Controls

| Action                  | Right handed | Left handed |
| ----------------------- | ------------ | ----------- |
| Step back / forward     | A / D        | J / L       |
| Lean back / forward \*  | Q / E        | U / O       |
| Zoom in / out \*        | W / S        | I / K       |
| Play/pause animation \* | Space        | Space       |

\* Not yet implemented

# Setup

Fetch dependencies:

    yarn

Start the dev server on port 3000:

    yarn start
