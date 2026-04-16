export const worksData = [
  {
    id: 1,
    title: 'SKYFRAME | DEV',
    isFeatured: true,
    category: 'Mobile App Development',
    tech: 'React Native / TypeScript / Supabase',
    shortDescription:
      'A visual-first Bluesky client with Pinterest-style layout and curation features, built as a comprehensive mobile development portfolio piece',
    ogImage: '/assets/images/metadata/og_project-skyframe.jpg',
    links: {
      liveDemo: null, // App store deployment pending
      github: 'https://github.com/sunnyju318/skyframe',
      techDocs:
        'https://www.notion.so/SF-Log-01-28fb6c448610807ebe25dc8f327377ba?source=copy_link#28fb6c44861081a8882cf6147fd13491',
      productBrief:
        'https://www.notion.so/SF-Log-01-28fb6c448610807ebe25dc8f327377ba?source=copy_link#28fb6c448610805596dadb946fe2a2ad',
      projectLog:
        'https://www.notion.so/2-SkyFrame-28cb6c44861080728199dd567a974456?source=copy_link',
    },
    preview: {
      type: 'video',
      src: '/assets/images/work/skyframedev/skyframedev_large.mp4',
    },
    thumbnail: '/assets/images/work/skyframedev/skyframedev_thumb.webp',

    codeSnippets: [
      {
        tab: 'Architecture',
        language: 'javascript',
        code: `// Context-based state management with optimized re-renders
  
  // BoardContext.tsx - Supabase integration for board management
  export function BoardProvider({ children }: BoardProviderProps) {
    const { user } = useAuth();
    const [boards, setBoards] = useState<BoardWithPosts[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (user?.did) {
        loadBoards();
      }
    }, [user?.did]);
  
    const loadBoards = async () => {
      const { data: boardsData, error } = await supabase
        .from("boards")
        .select("*")
        .eq("user_id", user.did)
        .order("created_at", { ascending: false });
  
      if (error) throw error;
  
      // Fetch actual post data from Bluesky
      const uniqueUris = [...new Set(boardPostsData.map(bp => bp.post_uri))];
      const posts = await Promise.all(uniqueUris.map(uri => getPost(uri)));
      
      const boardsWithPosts = boardsData.map(board => ({
        ...board,
        posts: posts.filter(p => p !== undefined)
      }));
  
      setBoards(boardsWithPosts);
    };
  
    const savePostToBoard = async (boardId: string, post: BlueskyPost) => {
      const { error } = await supabase
        .from("board_posts")
        .insert({ board_id: boardId, post_uri: post.uri });
      
      if (error) throw error;
      await loadBoards();
    };
  
    return (
      <BoardContext.Provider value={{ boards, savePostToBoard, ... }}>
        {children}
      </BoardContext.Provider>
    );
  }`,
      },
      {
        tab: 'API',
        language: 'typescript',
        code: `// Bluesky AT Protocol integration with proper error handling
  
  // blueskyApi.ts
  export const getDiscoverFeed = async (
    cursor?: string
  ): Promise<BlueskyTimelineResponse> => {
    try {
      const response = await agent.api.app.bsky.feed.getTimeline({
        limit: 50,
        cursor,
      });
  
      // Filter for image-only posts
      const filteredFeed = response.data.feed.filter((item) => {
        const embed = item.post.embed;
        return embed && "images" in embed && embed.images?.length > 0;
      });
  
      // Apply content moderation filters
      const safeFeed = filterPosts(filteredFeed.map(item => item.post));
  
      return {
        feed: safeFeed.map(post => ({ post })),
        cursor: response.data.cursor,
      };
    } catch (error) {
      console.error("Error fetching discover feed:", error);
      throw error;
    }
  };
  
  // Follow/Unfollow with optimistic updates
  export const followUser = async (did: string): Promise<string> => {
    const response = await agent.api.app.bsky.graph.follow.create(
      { repo: agent.session!.did },
      { subject: did, createdAt: new Date().toISOString() }
    );
    return response.uri;
  };
  
  export const likePost = async (uri: string, cid: string): Promise<string> => {
    const response = await agent.api.app.bsky.feed.like.create(
      { repo: agent.session!.did },
      { subject: { uri, cid }, createdAt: new Date().toISOString() }
    );
    return response.uri;
  };`,
      },
      {
        tab: 'Components',
        language: 'typescript',
        code: `// PostCard with shimmer loading and masonry layout optimization
  
  export default function PostCard({ feedItem, isLeftColumn }: PostCardProps) {
    const [imageLoading, setImageLoading] = useState(true);
    const shimmerAnimation = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      if (!imageLoading) return;
  
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
  
      loop.start();
      return () => loop.stop();
    }, [imageLoading]);
  
    const translateX = shimmerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 300],
    });
  
    const image = feedItem.post.embed?.images?.[0];
    const aspectRatio = image?.aspectRatio 
      ? image.aspectRatio.width / image.aspectRatio.height 
      : 1;
  
    return (
      <TouchableOpacity
        style={{
          marginRight: isLeftColumn ? 6 : 0,
          marginLeft: isLeftColumn ? 0 : 6,
        }}
        onPress={() => navigation.push("PostDetail", { post: feedItem })}
      >
        <View style={{ aspectRatio, minHeight: 200 }}>
          {imageLoading && (
            <View style={StyleSheet.absoluteFillObject}>
              <Animated.View style={{ transform: [{ translateX }] }}>
                <LinearGradient colors={["#D6D6D6", "#E6E6E6", "#D6D6D6"]} />
              </Animated.View>
            </View>
          )}
          
          <ExpoImage
            source={{ uri: image.thumb }}
            onLoad={() => setImageLoading(false)}
            transition={200}
          />
        </View>
      </TouchableOpacity>
    );
  }`,
      },
      {
        tab: 'Navigation',
        language: 'typescript',
        code: `// Stack-based navigation with proper post-to-post browsing
  
  // HomeStack.tsx
  export default function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeFeed" component={HomeScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    );
  }
  
  // App.tsx - Provider hierarchy
  export default function App() {
    return (
      <AuthProvider>
        <BoardProvider>
          <InteractionProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </InteractionProvider>
        </BoardProvider>
      </AuthProvider>
    );
  }
  
  // Type-safe navigation
  export type HomeStackParamList = {
    HomeFeed: undefined;
    PostDetail: { post: BlueskyPost | BlueskyFeedItem };
    Profile: { handle: string };
  };`,
      },
      {
        tab: 'Database',
        language: 'sql',
        code: `-- Supabase schema with Row Level Security
  
  -- Boards table
  CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    is_private BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  
  -- Board posts junction table
  CREATE TABLE board_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    post_uri TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(board_id, post_uri)
  );
  
  -- Row Level Security policies
  ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
  ALTER TABLE board_posts ENABLE ROW LEVEL SECURITY;
  
  -- Users can only access their own boards
  CREATE POLICY "Users can view own boards"
    ON boards FOR SELECT
    USING (user_id = current_setting('app.user_id'));
  
  CREATE POLICY "Users can create own boards"
    ON boards FOR INSERT
    WITH CHECK (user_id = current_setting('app.user_id'));
  
  CREATE POLICY "Users can update own boards"
    ON boards FOR UPDATE
    USING (user_id = current_setting('app.user_id'));
  
  -- Board posts inherit board permissions
  CREATE POLICY "Users can manage own board posts"
    ON board_posts FOR ALL
    USING (
      board_id IN (
        SELECT id FROM boards 
        WHERE user_id = current_setting('app.user_id')
      )
    );`,
      },
      {
        tab: 'Styling',
        language: 'javascript',
        code: `// NativeWind (Tailwind CSS) design system configuration
  
  // tailwind.config.js
  module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: {
            900: "#221F32",
            700: "#4C4464",
            500: "#766A95",
            300: "#A18DC8",
            100: "#C3B9E5",
            50: "#E2E1F0",
          },
          gray: {
            900: "#212529",
            700: "#343434",
            500: "#6C757D",
            400: "#ADB5BD",
            300: "#CED4DA",
            200: "#DEE2E6",
            100: "#F1F3F5",
            50: "#F8F9FA",
          },
        },
        fontFamily: {
          sans: ["Poppins", "sans-serif"],
        },
        fontSize: {
          display: ["32px", { lineHeight: "40px", fontWeight: "700" }],
          h1: ["24px", { lineHeight: "32px", fontWeight: "600" }],
          h2: ["20px", { lineHeight: "28px", fontWeight: "600" }],
          h3: ["18px", { lineHeight: "24px", fontWeight: "500" }],
          body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        },
        spacing: {
          16: "16px",
          20: "20px",
          24: "24px",
          32: "32px",
          58: "58px",
        },
        borderRadius: {
          xl: "14px",
          20: "20px",
          30: "30px",
        },
      },
    },
  };
  
  // Usage in components
  <View className="flex-1 bg-white pt-58">
    <Text className="text-h2 font-semibold text-gray-700">
      SkyFrame
    </Text>
  </View>`,
      },
    ],

    sections: {
      meta: {
        role: 'Product Owner, UX/UI Designer, Mobile Developer',
        stack: [
          'React Native',
          'TypeScript',
          'Expo',
          'Tailwind CSS',
          'Supabase',
          'AT Protocol',
        ],
        timeline: 'In Progress',
        timelineSteps: [
          { phase: 'MVP', completed: true },
          { phase: 'Boards', completed: true },
          { phase: 'Polish', completed: true },
          { phase: 'Deploy', completed: false },
          { phase: 'Phase2', completed: false },
        ],
        platform: 'iOS / Android (React Native)',
      },

      summary: {
        problem:
          'Visual creators on Bluesky lack a dedicated image-focused client with curation features similar to Pinterest',
        goal: 'Create production-ready mobile app demonstrating full-stack mobile development and UX/UI design capabilities',
        keyContribution:
          'Solo development from product strategy to implementation, delivering image-only feed, board system, and Bluesky API integration in 8 weeks',
      },

      techStack: {
        frontend:
          'React Native 0.81 with Expo SDK 54 for cross-platform development',
        typeScript:
          'Strict TypeScript configuration for type safety and better developer experience',
        styling:
          'NativeWind 2.0 (Tailwind CSS for React Native) with custom design tokens and component-based styling',
        stateManagement:
          'Context API with three specialized contexts (Auth, Board, Interaction) for optimized re-renders',
        navigation:
          'React Navigation 7 with native stack navigators and proper type safety',
        backend:
          'Supabase for PostgreSQL database with Row Level Security policies for data protection',
        api: '@atproto/api for Bluesky integration with session management and token persistence',
        ui: '@react-native-seoul/masonry-list for Pinterest-style layouts, expo-image for optimized loading',
        dataStorage:
          'AsyncStorage for session persistence, Supabase for board/post data',
        security:
          'Environment variables for credentials, Row Level Security on database, proper token handling',
      },

      architecturalChoices: {
        layeredArchitecture:
          'Clear separation of concerns with contexts/ (state), services/ (API), screens/ (UI), components/ (reusable), types/ (TypeScript), utils/ (helpers)',
        contextStrategy:
          'Three specialized contexts instead of single global store to prevent unnecessary re-renders and maintain clear boundaries',
        serviceLayer:
          'Dedicated API service modules (blueskyApi.ts, authService.ts, supabaseClient.ts) to abstract implementation details from UI',
        typeSystem:
          'Comprehensive TypeScript types for Bluesky API responses, navigation params, and database schemas',
        navigationArchitecture:
          'Stack-based navigation per tab (HomeStack, SearchStack, ProfileStack) enabling proper post-to-post browsing within each context',
      },

      developmentHighlights: {
        blueskyIntegration:
          'Implemented complete Bluesky AT Protocol integration including authentication, timeline feeds, search, user profiles, and social interactions (follow, like, repost)',
        boardSystem:
          'Built Pinterest-style board/collection system with Supabase backend, supporting CRUD operations and real-time sync with Bluesky content',
        imageFiltering:
          'Developed content filtering system that extracts only posts with images, applies content moderation labels, and validates hashtag quality',
        masonryLayout:
          'Implemented optimized masonry layout with shimmer skeleton loading, proper aspect ratio preservation, and infinite scroll pagination',
        modalInterfaces:
          'Created Pinterest-inspired modal system for saving posts to boards with create/edit/delete functionality and visual feedback',
        interactionSystem:
          'Built global interaction context managing follow/unfollow, like/unlike, and repost/unrepost with optimistic UI updates',
        securityImplementation:
          'Configured Row Level Security policies on Supabase ensuring users can only access their own boards and posts',
        navigationFlow:
          'Designed navigation architecture supporting post-to-post browsing, profile navigation from any screen, and proper back stack management',
      },

      challengesAndLearnings: {
        navigationComplexity:
          'Initial navigation setup caused duplicate screens and broken back buttons. Resolved by implementing proper stack navigators per tab instead of shared PostDetail screen',
        stateManagement:
          'Managing interaction states (likes, follows, reposts) across components led to prop drilling. Solved with InteractionContext providing centralized state accessible from any component',
        contentFiltering:
          'Bluesky posts include various embed types (external links, quotes, videos). Had to implement robust type guards and filtering to ensure only image posts display correctly',
        asyncDataFlow:
          'Board posts reference Bluesky URIs requiring separate API calls to fetch actual post data. Implemented parallel Promise.all fetching with proper error handling',
        typeScriptIntegration:
          'React Navigation type safety required complex type definitions for nested navigators. Created comprehensive type system ensuring compile-time route param validation',
        performanceOptimization:
          'Initial masonry list had janky scrolling. Optimized with expo-image for lazy loading, proper key extraction, and avoiding unnecessary re-renders',
      },

      projectArchitecture:
        '/assets/images/work/skyframedev/project_architecture.webp',

      performanceOptimization: {
        imageOptimization:
          'Implemented expo-image with progressive loading, cached requests, and WebP support for 60% faster load times',
        listPerformance:
          'Optimized masonry layout with proper keyExtractor, getItemType, and removeClippedSubviews for smooth 60fps scrolling',
        memoryManagement:
          'Used Map data structures for O(1) lookups in interaction states, preventing array iterations on every render',
        apiEfficiency:
          'Batch post fetches using Promise.all, implemented cursor-based pagination, and deduplicated API requests',
        contextOptimization:
          'Split single app context into three specialized contexts to minimize component re-renders on state changes',
      },

      nextSteps: {
        postCreation:
          'Implement post creation functionality with image upload, hashtag suggestions, and draft saving (Phase 2 feature)',
        aiIntegration:
          'Add OpenAI Vision API integration for automatic hashtag suggestions based on image content analysis',
        personalization:
          'Develop user behavior tracking to personalize discover feed based on interaction history and saved boards',
        offlineSupport:
          'Implement offline-first architecture with local caching and background sync when connection restored',
        appStoreDeployment:
          'Prepare EAS Build configuration, app store assets, and submission for iOS App Store and Google Play Store',
        advancedSearch:
          'Add filters for date range, user, engagement metrics, and save search queries as custom feeds',
        socialFeatures:
          'Enable board sharing, collaborative boards, and in-app notifications for board activity',
      },
    },
  },
  {
    id: 2,
    title: 'SKYFRAME | UXUI',
    isFeatured: true,
    category: 'UXUI Design',
    tech: 'Figma, Illustrator',
    shortDescription:
      'A visual-first mobile client for Bluesky, inspired by Pinterest-style image browsing and built through comprehensive UX research and prototyping.',
    ogImage: '/assets/images/metadata/og_project-portfolio.jpg',
    links: {
      prototype:
        'https://www.figma.com/proto/OZuSSoUvct6MBpTQHoWKgG/SkyFrame?page-id=278%3A1180&node-id=279-1031&p=f&viewport=136%2C25%2C0.14&t=k1WBaFTY2Zq3nmQU-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=279%3A1031&show-proto-sidebar=1',
      caseStudy: '/skyframe_case-study.pdf',
      productBrief:
        'https://www.notion.so/SF-Log-01-28fb6c448610807ebe25dc8f327377ba?source=copy_link#28fb6c448610805596dadb946fe2a2ad',
      projectLog:
        'https://www.notion.so/2-SkyFrame-28cb6c44861080728199dd567a974456?source=copy_link',
    },
    // 외부 링크들을 모아둔 객체
    preview: {
      type: 'image', // 또는 "image"
      src: '/assets/images/work/skyframe/skyframe_large.webp',
    },
    thumbnail: '/assets/images/work/skyframe/skyframe_thumb.webp',
    // 실제 표시할 코드, 템플릿 리터럴(벡틱)사용으로 여러줄 지원
    // 들여쓰기, 줄바꿈 모두 보존됨
    sections: {
      meta: {
        role: 'Product Owner, UX/UI Designer',
        tools: ['Figma', 'Illustrator'],
        timeline: 'Oct - Dec 2025',
        timelineSteps: [
          { phase: 'Research', completed: true },
          { phase: 'Define', completed: true },
          { phase: 'Design', completed: true },
          { phase: 'Prototype', completed: true },
          { phase: 'Testing', completed: true },
        ],
        platform: 'iOS / Android Mobile',
      },
      summary: {
        projectType:
          'Visual-first mobile client design for Bluesky social platform',
        approach:
          'Full UX/UI process from research and personas to wireframes, prototypes, and interaction design',
        keyFocus:
          'Image discovery and creative expression with emphasis on clarity, accessibility, and visual balance',
      },
      background: {
        platform:
          'Bluesky is a decentralized social platform where illustrators and designers share creative work',
        currentIssue:
          'Mixed text and image feed forces users to visit each profile separately, making visual exploration fragmented',
        motivation:
          'Created to deliver a seamless, image-first browsing experience for visual content',
      },
      problem: {
        creatorChallenge:
          'Creators struggle to keep their artworks visible in text-heavy feeds',
        viewerChallenge:
          'Viewers must visit each profile individually to browse images',
        impact:
          'Repetitive navigation reduces engagement and discourages visual discovery',
      },
      goal: {
        primaryObjective:
          'Unify scattered image posts into a single, visual-only feed that enables effortless browsing and discovery',
        userExperience:
          'Deliver seamless visual exploration without repetitive navigation',
        designPrinciple:
          "Keep Bluesky's simplicity while enhancing clarity, speed, and creative focus",
      },
      solution: {
        contentFiltering:
          'Filters out text and consolidates images from followed artists into one flowing visual feed',
        layoutDesign:
          'Masonry-style grid that preserves original aspect ratios for natural, uninterrupted browsing',
        interaction:
          'Quick interactions and lightweight interface deliver a clean, enjoyable visual experience',
      },
      userFlows: [
        {
          label: 'Browse & Visit',
          image: '/assets/images/work/skyframe/skyframe_user-flow-01.webp',
        },
        {
          label: 'Search & Save',
          image: '/assets/images/work/skyframe/skyframe_user-flow-02.webp',
        },
      ],
      designDecisions: [
        {
          label: 'Visual First Experience',
          rationale: {
            problem:
              'Mixed timelines dilute visual focus and disrupt browsing rhythm',
            solution:
              'Filtering out text and using flexible masonry grid that preserves original aspect ratios',
            impact:
              'Creates uninterrupted, natural browsing while reducing cognitive load and respecting how artists intended their work to be seen',
          },
          image:
            '/assets/images/work/skyframe/skyframe_design-decision-01.webp',
        },
        {
          label: 'Board System for Curation',
          rationale: {
            userNeed:
              'Users want to revisit and organize images they love beyond passive browsing',
            implementation:
              'Themed collections directly within SkyFrame, turning passive viewers into active curators',
            benefit:
              'Provides personal library to return to, increasing retention and keeping entire visual workflow inside one app',
          },
          image:
            '/assets/images/work/skyframe/skyframe_design-decision-02.webp',
        },
      ],
      designSystem: {
        label: 'Foundation & Components',
        description:
          'A scalable design system featuring purple gradient colors, Poppins typography, and modular components built on a 4px grid system for consistent mobile experiences.',
        images: [
          '/assets/images/work/skyframe/designSystem/design-system_logo.webp',
          '/assets/images/work/skyframe/designSystem/design-system_colors.webp',
          '/assets/images/work/skyframe/designSystem/design-system_typo.webp',
          '/assets/images/work/skyframe/designSystem/design-system_icons.webp',
          '/assets/images/work/skyframe/designSystem/design-system_cards.webp',
          '/assets/images/work/skyframe/designSystem/design-system_buttons.webp',
          '/assets/images/work/skyframe/designSystem/design-system_form.webp',
          '/assets/images/work/skyframe/designSystem/design-system_navigation.webp',
        ],
        figmaLink:
          'https://www.figma.com/design/OZuSSoUvct6MBpTQHoWKgG/SkyFrame?node-id=17-33&t=jdsnAK6cLO7iYlev-1',
      },
      browseVisitFlow: {
        description:
          'Full exploration flow from Discover feed to post details, user profiles, and Board collections. Built with masonry layouts and structured information hierarchy to create an intuitive content discovery experience.',
        images: [
          '/assets/images/work/skyframe/finalProduct/discovery/flow1_discover.webp',
          '/assets/images/work/skyframe/finalProduct/discovery/flow2_following.webp',
          '/assets/images/work/skyframe/finalProduct/discovery/flow3_detail.webp',
          '/assets/images/work/skyframe/finalProduct/discovery/flow4_post.webp',
          '/assets/images/work/skyframe/finalProduct/discovery/flow5_board.webp',
          '/assets/images/work/skyframe/finalProduct/discovery/flow6_board_detail.webp',
          '/assets/images/work/skyframe/finalProduct/discovery/flow7_photo.webp',
        ],
        figmaLink:
          'https://www.figma.com/proto/OZuSSoUvct6MBpTQHoWKgG/SkyFrame?page-id=278%3A1180&node-id=279-1039&p=f&viewport=299%2C164%2C0.11&t=OsKuREDGjyNf0ZAZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=279%3A1039&show-proto-sidebar=1',
      },
      searchSaveFlow: {
        description:
          'Content creation and board management flow from home feed to post creation, library browsing, and board organization.',
        images: [
          '/assets/images/work/skyframe/finalProduct/create/flow1_home-discover.webp',
          '/assets/images/work/skyframe/finalProduct/create/flow2_create-post.webp',
          '/assets/images/work/skyframe/finalProduct/create/flow3_library.webp',
          '/assets/images/work/skyframe/finalProduct/create/flow4_post.webp',
          '/assets/images/work/skyframe/finalProduct/create/flow5_post-destination.webp',
          '/assets/images/work/skyframe/finalProduct/create/flow6_board-selection.webp',
          '/assets/images/work/skyframe/finalProduct/create/flow7_view-board.webp',
        ],
        figmaLink: '',
      },
    },
    // Array인 이유 : 항목이 리스트 형태이며 배열은 반복문 돌리기 좋고 리엑트에서 <ul><li>...</li></ul>로 쉽게 렌더링할수 있기 때문이다.
  },
  {
    id: 3,
    // useParams()로 받은 id와 비교해서 해당 프로젝트를 찾을 때 사용함
    title: 'PORTFOLIO | DEV',
    isFeatured: true, // featured에 들어갈 목록임을 표시
    category: 'Web Development',
    tech: 'React / SCSS / Framer Motion',
    shortDescription:
      'A portfolio website built with React and SCSS, featuring smooth animations and interactive storytelling',
    ogImage: '/assets/images/metadata/og_project-portfolio.jpg',
    links: {
      liveDemo: 'https://jisun-ju.ca/',
      github: 'https://github.com/sunnyju318/sunnyju-portfolio',
      projectLog:
        'https://www.notion.so/5-My-Portfolio-25db6c4486108060ba46d90f8154ba68?source=copy_link',
    },
    // 외부 링크들을 모아둔 객체
    preview: {
      type: 'video', // 또는 "image"
      src: '/assets/images/work/portfolio/portfolio_large.mp4',
    },
    thumbnail: '/assets/images/work/portfolio/portfolio_thumb.webp',
    codeSnippets: [
      {
        tab: 'Components',
        language: 'javascript',
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// Mobile: Click to expand with smooth animation
function ProjectAccordion({ title = "FEATURED PROJECTS", isFeatured = true }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleToggle = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const featuredProjects = isFeatured
    ? worksData.filter((project) => project.isFeatured)
    : worksData;

  return (
    <div className="featured-project-list-wrapper">
      {featuredProjects.map((project, index) => (
        <div
          key={project.id}
          className={list-box {expandedItem === index ? "list-item" : ""}}
          onClick={() => handleToggle(index)}
        >
          <motion.span className="featured-project-title">
            {project.title}
          </motion.span>

          {expandedItem === index && (
            <motion.div
              className="project-preview"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <img src={project.thumbnail} alt={project.title} loading="lazy" />
              <p>{project.shortDescription}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

// Desktop: Hover to preview with split layout
function ProjectSplitView({ title = "FEATURED PROJECTS", isFeatured = true }) {
  const [expandedItem, setExpandedItem] = useState(0);

  const featuredProjects = isFeatured
    ? worksData.filter((project) => project.isFeatured)
    : worksData;

  return (
    <div className="project-split-view-wrapper">
      <div className="preview-box-desktop">
        {expandedItem !== null && (
          <img
            src={featuredProjects[expandedItem]?.thumbnail}
            alt={featuredProjects[expandedItem]?.title}
          />
        )}
      </div>

      <div className="featured-project-list-wrapper-desktop">
        {featuredProjects.map((project, index) => (
          <Link
            to={/projects/detail/{project.id}}
            key={project.id}
            onMouseEnter={() => setExpandedItem(index)}
            onMouseLeave={() => setExpandedItem(null)}
          >
            <motion.span
              animate={expandedItem === index ? { x: [0, 10, 0] } : {}}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.span>
          </Link>
        ))}
      </div>
    </div>
  );
}`,
      },
      {
        tab: 'Styling',
        language: 'scss',
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// Design Tokens - Color System
$near-black: #040404;
$dusty-rose: #b58971;
$scarlet-red: #d13221;
$muted-beige: #e1dad2;

// Semantic Color Usage
$bg-gradient-start: $near-black;
$text-heading-list: $dusty-rose;

// Breakpoint System
$breakpoints: (
  "sm": 640px,
  "md": 768px,
  "lg": 1025px,
  "xl": 1280px
);

// Responsive Mixin
@mixin respond-to($breakpoint) {
  @if map.has-key($breakpoints, $breakpoint) {
    @media (min-width: map.get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

// Reusable Layout Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin container($max-width: 1400px) {
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 map.get($container-padding, 'sm');
  
  @include respond-to('md') {
    padding: 0 map.get($container-padding, 'md');
  }
  
  @include respond-to('lg') {
    padding: 0 map.get($container-padding, 'lg');
  }
}

// Usage Example
.featured-project-list-wrapper {
  @include container;
  padding-top: 2rem;
  
  @include respond-to('lg') {
    padding-top: 4rem;
  }
}`,
      },
      {
        tab: 'Animation',
        language: 'javascript',
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// GSAP-based background animation with MotionPath

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useEffect } from 'react';

gsap.registerPlugin(MotionPathPlugin);

const BackgroundAnimation = () => {
  useEffect(() => {
    const createFallingAnimation = (blurElement, pathId, delay = 0) => {
      // Set initial state
      gsap.set(blurElement, {
        motionPath: {
          path: pathId,
          autoRotate: false,
        },
        opacity: 0,
      });

      // Animate along SVG path
      gsap.to(blurElement, {
        motionPath: {
          path: pathId,
          autoRotate: false,
        },
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: "none",
        repeat: -1,
        repeatDelay: Math.random() * 10 + 5,
      });
    };

    // Apply animations
    createFallingAnimation('.left-set .blur-1', '#left-curve1', 5);
    createFallingAnimation('.left-set .blur-2', '#left-curve2', 0);
    createFallingAnimation('.left-set .blur-3', '#left-curve3', 10);

    createFallingAnimation('.right-set .blur-1', '#right-curve1', 2);
    createFallingAnimation('.right-set .blur-2', '#right-curve2', 10);
    createFallingAnimation('.right-set .blur-3', '#right-curve3', 5);
  }, []);

  return (
    <div className="background-animation">
      <svg viewBox="0 0 237.21 841.89">
        <path id="left-curve1" d="M10.5 0v173.32..." />
        <rect className="falling-blur blur-1" />
      </svg>
    </div>
  );
};`,
      },
      {
        tab: 'Data',
        language: 'javascript',
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// Centralized project data structure

export const worksData = [
  {
    id: 1,
    title: "PORTFOLIO",
    isFeatured: true,
    category: "Web Development",
    tech: "React / SCSS / Framer Motion",
    
    links: {
      liveDemo: "https://jisun-ju.ca/",
      viewCode: "https://github.com/...",
      logDetail: "https://www.notion.so/..."
    },
    
    preview: {
      type: "video",
      src: portfolioLarge
    },
    
    codeSnippets: [
      {
        tab: "Components",
        language: "javascript",
        code: ...
      }
    ],
    
    sections: {
      overview: "...",
      roleAndStack: {
        stack: [
          "React",
          "SCSS",
          "Framer Motion",
          "GSAP",
          "Figma",
          "Illustrator",
          "GitHub"
        ]
      },
      designAndDevelopment: ["...", "..."],
      challengesAndLearnings: ["...", "..."]
    },
    
    nextProject: {
      id: 2,
      title: "INFO STORIES"
    }
  }
];

// Usage: Dynamic filtering and routing
const featuredProjects = worksData.filter(p => p.isFeatured);
const project = worksData.find(p => p.id === parseInt(id));`,
      },
      {
        tab: 'Performance',
        language: 'javascript',
        // 코드 하이라이트용 언어 식별자, 나중에 신택스 하이라이터 라이브러리 사용할때 필요함
        code: `// Mouse-following eye animation with performance optimization

const FaceIllustration = () => {
  const svgRef = useRef(null);
  const eyeElementsRef = useRef({ left: null, right: null });
  const throttleRef = useRef({ lastTime: 0, animationId: null });

  // Cache eye elements once to avoid repeated DOM queries
  const cacheEyeElements = useCallback(() => {
    if (!svgRef.current) return;
    
    if (!eyeElementsRef.current.left || !eyeElementsRef.current.right) {
      eyeElementsRef.current.left = svgRef.current.querySelector("#left-eye");
      eyeElementsRef.current.right = svgRef.current.querySelector("#right-eye");
    }
    return eyeElementsRef.current.left && eyeElementsRef.current.right;
  }, []);

  // Throttled mouse tracking with requestAnimationFrame
  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    
    // Throttle to ~60fps (16ms)
    if (now - throttleRef.current.lastTime < 16) return;
    throttleRef.current.lastTime = now;

    // Cancel previous frame if not yet executed
    if (throttleRef.current.animationId) {
      cancelAnimationFrame(throttleRef.current.animationId);
    }

    throttleRef.current.animationId = requestAnimationFrame(() => {
      if (!cacheEyeElements()) return;

      // Calculate movement based on cursor position
      const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
      
      // Use translate3d for GPU acceleration
      const transform = translate3d({moveX}px, {moveY}px, 0);

      eyeElementsRef.current.left.style.transform = transform;
      eyeElementsRef.current.right.style.transform = transform;
    });
  }, [cacheEyeElements]);

  useEffect(() => {
    // Delay DOM query to ensure SVG is fully rendered
    const timer = setTimeout(() => cacheEyeElements(), 100);
    
    // Passive event listener for better scroll performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
      
      if (throttleRef.current.animationId) {
        cancelAnimationFrame(throttleRef.current.animationId);
      }
    };
  }, [handleMouseMove, cacheEyeElements]);

  return <FaceSvg ref={svgRef} />;
};`,
      },
    ],
    // 실제 표시할 코드, 템플릿 리터럴(벡틱)사용으로 여러줄 지원
    // 들여쓰기, 줄바꿈 모두 보존됨
    sections: {
      meta: {
        role: 'UX/UI Designer, Frontend Developer',
        stack: ['React', 'SCSS', 'Framer Motion', 'GSAP'],
        timeline: 'May - Oct 2025',
        timelineSteps: [
          { phase: 'Planning', completed: true },
          { phase: 'Design', completed: true },
          { phase: 'Build', completed: true },
          { phase: 'Polish', completed: true },
          { phase: 'Launch', completed: true },
        ],
        platform: 'Web (Responsive)',
      },
      summary: {
        problem:
          'Required portfolio to demonstrate frontend + UX.UI capabilities',
        goal: 'React-based responsive portfolio with optimized performance',
        keyContribution:
          'Solo development from branding to deployment with 98/79 Lighthouse scores',
      },
      techStack: {
        frontend: 'React 19 with Vite and React Router for SPA routing',
        styling:
          'SCSS with BEM methodology, CSS custom properties (design tokens), and responsive mixins',
        animation:
          'Framer Motion for page transitions and component animations, GSAP MotionPathPlugin for background effects',
        components:
          'React Icons and custom reusable components (CodeBlock, AnimatedArrow, ProjectTimeline)',
        dataManagement:
          'Centralized worksData.jsx structure with page-driven state management (no global context)',
        utilities:
          'EmailJS for contact form handling, IntersectionObserver API for scroll-triggered animations',
        deployment: 'HostPapa (cPanel hosting) with GitHub for version control',
        optimization:
          'WebP/AVIF image formats, lazy loading, code splitting, and GPU-accelerated animations',
      },

      architecturalChoices: {
        componentStrategy:
          'Mobile-first with adaptive components (ProjectAccordion for mobile, ProjectSplitView for desktop) optimized per breakpoint rather than forcing single component to handle all scenarios',
        dataArchitecture:
          'Centralized worksData.jsx structure for content management, enabling updates without touching component logic',
        stylingApproach:
          'BEM methodology with SCSS design tokens and reusable mixins for maintainable, scalable styling',
        stateManagement:
          'Page-driven state over global context to keep components independent and avoid unnecessary re-renders',
      },

      developmentHighlights: {
        componentArchitecture:
          'Built adaptive component system where ProjectAccordion (mobile) and ProjectSplitView (desktop) share identical data structures while delivering device-optimized interactions',
        stylingSystem:
          'Structured SCSS architecture using design tokens, namespaced modules, and reusable mixins for consistent responsive behavior',
        performanceOptimization:
          'Implemented lazy loading, code splitting, and GPU-accelerated animations. Disabled resource-intensive effects on mobile devices',
        mediaOptimization:
          'Reduced file sizes through WebP/AVIF conversion and ffmpeg compression, optimizing images, GIFs, and MP4s for faster loading',
        accessibilityEnhancements:
          'Converted scroll-triggered animations to IntersectionObserver with prefers-reduced-motion support for better mobile and assistive device compatibility',
      },

      challengesAndLearnings: {
        animationPerformance:
          'Face illustration eye-tracking caused scroll jank. Resolved with DOM caching, throttling, requestAnimationFrame, and GPU acceleration (translate3d)',
        mobileAccessibility:
          'About page hover animations failed on touch devices. Switched to IntersectionObserver with threshold hysteresis to prevent flickering',
        layoutStability:
          'Menu opening caused layout shift due to scrollbar width. Tested multiple approaches and implemented overflow: hidden as the most reliable solution',
      },
      projectArchitecture:
        '/assets/images/work/portfolio/project_architecture.webp',
      performanceOptimization: {
        lighthouseScores:
          'Achieved 98 (Desktop) and 79 (Mobile) through systematic optimization',
        imageOptimization:
          'Implemented lazy loading with WebP/AVIF formats and proper fallbacks',
        codeSplitting:
          'Applied React Router-based code splitting to reduce initial bundle size',
        animationOptimization:
          'GPU acceleration (translate3d) with resource-intensive effects disabled on mobile',
        mediaCompression:
          'Reduced file sizes through ffmpeg compression, improving LCP and CLS metrics',
      },

      nextSteps: {
        darkMode:
          'Implement dark mode with system preference detection and persistent user choice',
        blogSection:
          'Add MDX-powered blog for technical writing and project deep-dives',
        analytics:
          'Integrate analytics to track engagement and optimize content strategy',
        interactivePlayground:
          'Create coding playground demonstrating React patterns and architecture',
        accessibility:
          'Enhance keyboard navigation and add comprehensive ARIA labels',
        internationalization:
          'Add i18n support for Korean/English bilingual toggle',
      },
    },
    // Array인 이유 : 항목이 리스트 형태이며 배열은 반복문 돌리기 좋고 리엑트에서 <ul><li>...</li></ul>로 쉽게 렌더링할수 있기 때문이다.
  },
];
