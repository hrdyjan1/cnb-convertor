function getLastUpdatedLabel(updatedAt?: string | number | Date | null) {
  if (!updatedAt) return 'Last updated: —';
  return `Last updated: ${new Date(updatedAt).toLocaleString('cs-CZ')}`;
}

export { getLastUpdatedLabel };
