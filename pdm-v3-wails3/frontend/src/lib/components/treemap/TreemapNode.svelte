<script>
  import TreemapNode from './TreemapNode.svelte';

  let { node, x, y, width, height, depth } = $props();
  let childrenLayout = $state([]);

  // Debugging logs
  $effect(() => {
    console.log(`Node ${node.name} at ${depth}:`,
      `X: ${x.toFixed(1)}, Y: ${y.toFixed(1)}, ` +
      `W: ${width.toFixed(1)}, H: ${height.toFixed(1)}`
    );

    childrenLayout = getChildrenLayout();

  });
  $effect(() => {
    console.log(childrenLayout.length);
  });



  const getChildrenLayout = () => {
    if (!node.isDir || !node.children?.length) return [];

    const totalSize = node.size;
    const direction = depth % 2 === 0 ? 'horizontal' : 'vertical';
    let currentPos = 0;

    return node.children.map(child => {
      console.log("Handle children: "+ child.name);
      // Handle zero-totalSize case by equal distribution
      const ratio = totalSize > 0
        ? child.size / totalSize
        : 1 / node.children.length;

      // Rest of your existing calculations...
      let childWidth, childHeight;

      if (direction === 'horizontal') {
        childWidth = Math.max(width * ratio, 1);
        childHeight = height;
      } else {
        childWidth = width;
        childHeight = Math.max(height * ratio, 1);
      }


      const childX = direction === 'horizontal' ? x + currentPos : x;
      const childY = direction === 'vertical' ? y + currentPos : y;

      currentPos += direction === 'horizontal' ? childWidth : childHeight;

      return {
        node: child,
        x: Math.round(childX),
        y: Math.round(childY),
        width: Math.round(childWidth),
        height: Math.round(childHeight),
        depth: depth + 1
      };
    });
  };

  // Visual parameters
  const fillColor = $derived(node.isDir ? '#7dd3fc' : '#38bdf8');
  const textVisible = $derived(width > 40 && height > 20);
</script>

{#if node.isDir && childrenLayout.length}
  {#each childrenLayout as layout}
    <TreemapNode {...layout} />
  {/each}
{:else}
  <!-- File/non-directory display -->
  <rect
    x={x}
    y={y}
    width={Math.max(width, 1)}
    height={Math.max(height, 1)}
    fill={fillColor}
    stroke="#0ea5e9"
    stroke-width="1"
  />

  {#if textVisible}
    <text
      x={x + 4}
      y={y + 14}
      font-size="12"
      fill="#0c4a6e"
      style="font-family: sans-serif"
    >
      {node.name.split('/').pop()}
      <tspan x={x + 4} dy="16">{node.size.toLocaleString()} B</tspan>
    </text>
  {:else}
    <text x={x + 2} y={y + 8} font-size="8" fill="red">
      •
    </text>
  {/if}
{/if}
