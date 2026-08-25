These references share a very specific interface language: **the UI looks like an agent system exposing its internal structure while it runs.** The important thing is not the dark theme or neon accents; it’s the way components are represented as modular, inspectable units connected into a live system.

The main interface patterns I see are:

- **Stacked system modules.** In the first reference, every capability is a rectangular module with a title, status, metadata, and a progress/state bar. The modules are vertically nested and slightly offset, which makes the interface feel like a provisioning pipeline or execution stack rather than a dashboard.
    
- **Node-and-connector architecture.** In the later references, cards are connected with thin lines and glowing junction points. The lines are not decorative: they imply data flow, dependency, or execution order. The glowing nodes act like ports in a visual programming system.
    
- **Agent configuration panels.** The agent itself is represented as a structured form: `Role`, `Language Model`, `Tools`, `Input Message`, etc. This gives the impression that the agent is something configurable and inspectable, not just a chat persona.
    
- **Context cards as modules.** Content Search, Code Debugger, API Integration, Basic Prompting, Doc Assistant, and similar pieces are shown as self-contained cards with their own labels, descriptions, and sometimes provider/tool metadata. They behave like composable capabilities.
    
- **Explicit inputs and outputs.** The fourth reference is especially useful: you can visually trace `User → Model/Agent → Tools → Response`. Each stage has a port, and the response is treated as another node in the flow. It makes the agent feel like a pipeline.
    
- **Progress and operational state.** Statuses like provisioning percentages, “Responding…,” elapsed time, connected tools, and model selection make the UI feel live. The interface exposes system state rather than hiding everything behind a polished chat bubble.
    
- **Small system metadata.** There’s lots of tiny secondary information: provider names, percentages, model names, timing, connection counts, and short technical descriptors. This creates the feeling of an IDE or control plane.
    

For your portfolio, I would describe this overall interaction language as:

> **Agent orchestration UI / inspectable agent runtime**

or more specifically:

> **A visual agent system where experiences, tools, concepts, and prompts are represented as modular nodes with explicit connections, active states, and inspectable metadata.**

The most relevant patterns for you would be:

1. **Agent card as the central runtime**
    
    - `ROLE`
        
    - `TASK`
        
    - `MODE`
        
    - `INPUT`
        
    - `CONTEXT`
        
    - `TOOLS`
        
2. **Experience/tool tiles as connected modules**
    
    - Tesla
        
    - Autodesk
        
    - Intuit
        
    - APIs
        
    - Data pipelines
        
    - Figma
        
    - React
        
    - AI evaluation
        
3. **Connector lines that react to context**
    
    - hover a tile → its line lights up
        
    - ask a question → relevant nodes activate
        
    - agent response → trace the path through the nodes it used
        
4. **Ports on cards**  
    Tiny circular connection points on card edges. These are important because they make the interface feel like a system instead of a grid.
    
5. **Status microcopy**  
    Instead of generic labels, use things like:
    
    - `3 EXPERIENCES LOADED`
        
    - `2 SYSTEM CONCEPTS ACTIVE`
        
    - `MODE: TRACE`
        
    - `CONTEXT UPDATED`
        
    - `RESPONSE: 184MS`
        
    - `SOURCE: TESLA + AUTODESK`
        
6. **Live-state transitions**  
    A node could move through:
    
    - dormant
        
    - available
        
    - active
        
    - referenced
        
    - completed
        

The strongest adaptation for your site would probably be a composition like this:

```text
      [ TESLA ]             [ APIs ]
          \                   /
           \                 /
            ●───────────────●
                    |
              [ JASMINE AGENT ]
              ROLE   Product / AI
              MODE   Trace
              TASK   Explain transition
              TOOLS  4 connected
                    |
                    ●
              [ RESPONSE ]
```

Then around that, additional tiles can sit in loose clusters:

```text
EXPERIENCES
[Intuit] [Tesla] [Autodesk]

SYSTEMS
[APIs] [Contracts] [Data]

TOOLS
[Figma] [React] [Python]
```

The interaction should feel like a **small visual graph that becomes active when the user asks something**, not like a permanent giant flowchart.

One important distinction from your screenshots: I would keep the structure but make it much more editorial and spatial. These references are dense product interfaces. Your version should have more breathing room, fewer visible controls, and only show connections when they become meaningful.

So the design principle I’d use is:

> **Default state = calm composition. Interaction state = system reveals itself.**

That way the agent feels sophisticated without turning your portfolio into enterprise software.