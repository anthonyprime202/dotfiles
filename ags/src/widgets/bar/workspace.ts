import Config from "src/lib/config"

const Hyprland = await Service.import("hyprland")

const WorkspaceButton = (i: number) =>
    Widget.Button({
        cursor: "pointer",
        setup: (self) => {
            self.hook(
                Hyprland,
                () => {
                    // Checks if the workspace as clients
                    const workspace = Hyprland.getWorkspace(i)
                    self.toggleClassName(
                        "bar-fullscreen-workspace",
                        Boolean(workspace?.hasfullscreen),
                    )
                    self.toggleClassName(
                        "bar-active-workspace",
                        Boolean(workspace?.windows),
                    )
                },
                "changed",
            )
        },

        // Add focused class if workspace is focused
        className: Hyprland.active.workspace
            .bind("id")
            .transform((id) => `${id === i ? "bar-focused-workspace" : ""}`),

        // shape inside the workspace button
        child: Widget.Box({
            hpack: "center",
            vpack: "center",
            className: "bar-workspace-fill",
        }),

        onPrimaryClick: async () =>
            await Hyprland.messageAsync(`dispatch workspace ${i}`).catch(
                printerr,
            ),
    })

export default () =>
    Widget.Box({
        className: "bar-workspace-widget",
        vpack: "center",
        // Make workspaces according to `workspaceCount`
        children: Array.from(
            { length: Config.workspaceCount },
            (_, i) => i + 1,
        ).map((i) => WorkspaceButton(i)),
    })
