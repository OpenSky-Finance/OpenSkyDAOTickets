function ticketMetadata(series, seriesId, imageUrl) {
  return {
    name: `${series} Tickets #${seriesId}`,
    description: "OpenSkyDAO Tickets offer special fun and surprising benefits for holders.",
    image: imageUrl,
    attributes: [
      {
        trait_type: "Series",
        value: series,
      },
      {
        trait_type: "Series ID",
        display_type: "number",
        value: seriesId,
      },
    ],
  };
}

module.exports = {
  ticketMetadata
};
