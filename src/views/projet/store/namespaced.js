import { createNamespacedHelpers } from 'vuex';

const {
  mapActions: projetMapActions,
  mapGetters: projetMapGetters,
  mapMutations: projetMapMutations,
  mapState: projetMapState
} = createNamespacedHelpers('Projet');

export {
  projetMapActions,
  projetMapGetters,
  projetMapMutations,
  projetMapState
};
