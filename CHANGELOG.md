# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic
Versioning.

## [Unreleased]

### Added

- Initial open-source project documentation set:
  - `README.md`
  - `LICENSE`
  - `CONTRIBUTING.md`
  - `CODE_OF_CONDUCT.md`
  - `SECURITY.md`
  - `CHANGELOG.md`
- Package metadata for public registry/readability.
- GitHub Actions workflow for `spatialboard` CI.
- Mermaid sketch importer in sidebar:
  - Flowchart parsing/layout (`flowchart`/`graph`, common shapes/edges)
  - Sequence diagram parsing/layout (`sequenceDiagram`, participants/messages/notes)
  - Group support:
    - `subgraph ... end` for flowcharts
    - `box ... end` for sequence diagrams
  - Group containers rendered as normal rectangle `shape` nodes.
- Dev-app mock GIF endpoints for local testing without external API dependency.

## [0.1.0]

### Added

- Initial SpatialBoard release with core engine, built-in nodes, React board
  components, and SBD serialization support.
